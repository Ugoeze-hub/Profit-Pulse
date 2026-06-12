const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// 1. POST: CREATE A NEW TRANSACTION
// ==========================================
const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date, note } = req.body;

    if (!type || !amount || !category || !description) {
      return res.status(400).json({ error: 'Type, amount, category, and description are required.' });
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a valid positive number.' });
    }

    // Wrap in a Prisma Transaction to ensure data integrity
    const result = await prisma.$transaction(async (tx) => {
      // Create the record tied to the verified user
      const newTx = await tx.transaction.create({
        data: {
          userId: req.userId,
          type, // 'revenue' or 'expense'
          amount: numericAmount,
          category,
          description: description.trim(),
          date: date ? new Date(date) : new Date(),
          note: note ? note.trim() : null,
          // 👇 FIXED: Generates a unique OPay-style transaction reference code automatically
          reference: `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
        },
      });

      // Calculate how this impacts the user's running balance
      const balanceImpact = type === 'revenue' ? numericAmount : -numericAmount;

      // Update the user's core balance
      await tx.user.update({
        where: { id: req.userId },
        data: { balance: { increment: balanceImpact } },
      });

      return newTx;
    });

    return res.status(201).json({ message: 'Transaction saved successfully!', transaction: result });
  } catch (error) {
    return res.status(500).json({ error: 'Server error creating transaction', details: error.message });
  }
};

// ==========================================
// 2. GET: FETCH ALL USER TRANSACTIONS
// ==========================================
const getAllTransactions = async (req, res) => {
  try {
    const { search, category, type } = req.query;

    // Build smart, dynamic query filters matching the frontend search/filters
    const whereConditions = { userId: req.userId };

    if (type && type !== 'all') {
      whereConditions.type = type === 'income' ? 'revenue' : 'expense';
    }
    if (category) {
      whereConditions.category = category;
    }
    if (search) {
      whereConditions.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    const transactions = await prisma.transaction.findMany({
      where: whereConditions,
      orderBy: { date: 'desc' }, // Order newest to oldest for the feed
    });

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching transactions', details: error.message });
  }
};

// ==========================================
// 3. GET: FETCH SINGLE TRANSACTION BY ID
// ==========================================
const getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching transaction details', details: error.message });
  }
};

// ==========================================
// 4. PATCH: UPDATE EXISTING TRANSACTION
// ==========================================
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description, date, note } = req.body;

    // Find the old transaction first to calculate the balance delta correction
    const oldTx = await prisma.transaction.findFirst({
      where: { id, userId: req.userId },
    });

    if (!oldTx) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    const updatedAmount = amount ? parseFloat(amount) : oldTx.amount;
    const updatedType = type || oldTx.type;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Reverse old balance impact
      const oldImpact = oldTx.type === 'revenue' ? -oldTx.amount : oldTx.amount;
      // 2. Add new balance impact
      const newImpact = updatedType === 'revenue' ? updatedAmount : -updatedAmount;

      await tx.user.update({
        where: { id: req.userId },
        data: { balance: { increment: oldImpact + newImpact } },
      });

      // 3. Save modifications
      return await tx.transaction.update({
        where: { id },
        data: {
          type: updatedType,
          amount: updatedAmount,
          category: category || undefined,
          description: description ? description.trim() : undefined,
          date: date ? new Date(date) : undefined,
          note: note !== undefined ? note.trim() : undefined,
        },
      });
    });

    return res.status(200).json({ message: 'Transaction updated cleanly!', transaction: result });
  } catch (error) {
    return res.status(500).json({ error: 'Server error updating transaction', details: error.message });
  }
};

// ==========================================
// 5. DELETE: REMOVE A TRANSACTION
// ==========================================
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findFirst({
      where: { id, userId: req.userId },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    await prisma.$transaction(async (tx) => {
      // Reverse the balance impact from the user profile before deleting
      const balanceCorrection = transaction.type === 'revenue' ? -transaction.amount : transaction.amount;
      await tx.user.update({
        where: { id: req.userId },
        data: { balance: { increment: balanceCorrection } },
      });

      // Delete the record safely
      await tx.transaction.delete({ where: { id } });
    });

    return res.status(200).json({ message: 'Transaction deleted successfully, balance adjusted.' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error deleting transaction', details: error.message });
  }
};

// ==========================================
// 6. GET: SUMMARY BLOCK FOR DASHBOARD FEED
// ==========================================
const getSummary = async (req, res) => {
  try {
    console.log("➡️ [DEBUG] 1. Inside getSummary. User ID:", req.userId);
    
    const { period } = req.query; 
    let dateFilter = new Date();

    if (period === 'day') dateFilter.setDate(dateFilter.getDate() - 1);
    else if (period === 'week') dateFilter.setDate(dateFilter.getDate() - 7);
    else dateFilter.setMonth(dateFilter.getMonth() - 1);

    console.log("➡️ [DEBUG] 2. Date window calculated:", dateFilter);

    const aggregateData = await prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId: req.userId,
        date: { gte: dateFilter }, 
      },
      _sum: { amount: true },
      _count: { id: true },
    });

    console.log("➡️ [DEBUG] 3. Database responded. Data found:", aggregateData);

    let totalRevenue = 0;
    let totalExpenses = 0;
    let revenueCount = 0;
    let expensesCount = 0;

    aggregateData.forEach((group) => {
      if (group.type === 'revenue') {
        totalRevenue = group._sum.amount || 0;
        revenueCount = group._count.id || 0;
      } else if (group.type === 'expense') {
        totalExpenses = group._sum.amount || 0;
        expensesCount = group._count.id || 0;
      }
    });

    const profit = totalRevenue - totalExpenses;

    console.log("➡️ [DEBUG] 4. Sending JSON response back to Postman.");
    return res.status(200).json({
      summary: {
        revenue: totalRevenue,
        revenueItems: revenueCount,
        expenses: totalExpenses,
        expenseItems: expensesCount,
        profit,
        health: profit >= 0 ? 'Strong' : 'Critical',
      },
    });
  } catch (error) {
    console.error("❌ [DEBUG ERROR] getSummary crashed:", error.message);
    return res.status(500).json({ error: 'Server error calculating financial summary', details: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};