const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper to determine the starting date threshold based on requested periods
const getDateThreshold = (period) => {
  const threshold = new Date();
  if (period === 'day') threshold.setDate(threshold.getDate() - 1);
  else if (period === 'week') threshold.setDate(threshold.getDate() - 7);
  else threshold.setMonth(threshold.getMonth() - 1); // default fallback to 30 days
  return threshold;
};

// ==========================================
// 1. GET: OVERVIEW METRICS
// ==========================================
const getOverview = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const dateLimit = getDateThreshold(period);

    // Grab aggregated sums grouped by transaction type (revenue vs expense)
    const metrics = await prisma.transaction.groupBy({
      by: ['type'],
      where: { userId: req.userId, date: { gte: dateLimit } },
      _sum: { amount: true }
    });

    let revenue = 0;
    let expenses = 0;

    metrics.forEach(item => {
      if (item.type === 'revenue') revenue = item._sum.amount || 0;
      if (item.type === 'expense') expenses = item._sum.amount || 0;
    });

    return res.status(200).json({
      period,
      revenue,
      expenses,
      profit: revenue - expenses
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to aggregate dashboard overview', details: error.message });
  }
};

// ==========================================
// 2. GET: RECENT TRANSACTIONS FEED
// ==========================================
const getRecentTransactions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId },
      orderBy: { date: 'desc' },
      take: limit,
      select: {
        id: true,
        type: true,
        description: true,
        amount: true,
        date: true,
        category: true
      }
    });

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve recent activity feed', details: error.message });
  }
};


const getTrends = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const dateLimit = getDateThreshold(period);

    const transactions = await prisma.transaction.findMany({
      where: { userId: req.userId, date: { gte: dateLimit } },
      select: { amount: true, date: true, type: true }
    });

    // We calculate a percentage scaling representation to feed his frontend bar chart smoothly
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const summaryMap = weekdays.reduce((acc, day) => ({ ...acc, [day]: 0 }), {});
    let maxDayVolume = 0;

    transactions.forEach(tx => {
      const dayName = weekdays[new Date(tx.date).getDay()];
      summaryMap[dayName] += tx.amount;
      if (summaryMap[dayName] > maxDayVolume) maxDayVolume = summaryMap[dayName];
    });

    const trendData = weekdays.map(day => ({
      label: day,
      value: maxDayVolume > 0 ? Math.round((summaryMap[day] / maxDayVolume) * 100) : 0
    }));

    return res.status(200).json(trendData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to compute cash flow trends', details: error.message });
  }
};

// ==========================================
// 4. GET: EXPENSE PROPORTIONAL BREAKDOWN (%)
// ==========================================
const getExpenseBreakdown = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const dateLimit = getDateThreshold(period);

    const expensesGrouped = await prisma.transaction.groupBy({
      by: ['category'],
      where: { userId: req.userId, type: 'expense', date: { gte: dateLimit } },
      _sum: { amount: true }
    });

    const totalExpenseSum = expensesGrouped.reduce((acc, curr) => acc + (curr._sum.amount || 0), 0);

    // Map UI color badges matching his frontend breakdown setup dynamically
    const colorPalette = {
      'Stock': 'bg-[#f97316]',
      'Transport': 'bg-[#fcd34d]',
      'Staff': 'bg-[#22c55e]',
      'Utilities': 'bg-[#38bdf8]',
      'Other': 'bg-[#64748b]'
    };

    const breakdown = expensesGrouped.map(item => ({
      name: item.category,
      value: totalExpenseSum > 0 ? Math.round((item._sum.amount / totalExpenseSum) * 100) : 0,
      color: colorPalette[item.category] || 'bg-slate-400'
    }));

    return res.status(200).json(breakdown);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to evaluate expense breakdown distributions', details: error.message });
  }
};

// ==========================================
// 5. GET: GENERATE INSIGHTS SUMMARY (ADVISOR BLOCKS)
// ==========================================
const getInsights = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);

    // Gather records matching today's operations to summarize
    const todaysTransactions = await prisma.transaction.findMany({
      where: { userId: req.userId, date: { gte: today } }
    });

    let totalRevenue = 0;
    let totalExpenses = 0;
    let topProductSales = 0;
    let topProductDescription = 'None';
    let transportExpenses = 0;

    todaysTransactions.forEach(tx => {
      if (tx.type === 'revenue') {
        totalRevenue += tx.amount;
        if (tx.amount > topProductSales) {
          topProductSales = tx.amount;
          topProductDescription = tx.description;
        }
      } else {
        totalExpenses += tx.amount;
        if (tx.category === 'Transport') transportExpenses += tx.amount;
      }
    });

    const profit = totalRevenue - totalExpenses;

    // Format strings explicitly to inject real runtime values directly into his text layout bubbles
    const insightMessages = [
      {
        role: 'assistant',
        text: `Good evening. Today your business pulse is ${profit >= 0 ? 'strong' : 'under pressure'} — you earned ₦${totalRevenue.toLocaleString()} and kept ₦${profit.toLocaleString()} in profit after expenses.`,
        type: 'default'
      },
      {
        role: 'assistant',
        text: totalRevenue > 0 
          ? `Revenue was led by ${topProductDescription}, which brought ₦${topProductSales.toLocaleString()} in sales. That is your top item for today.`
          : 'No sales recorded yet for today. Looking forward to your next entries!',
        type: 'highlight'
      },
      {
        role: 'assistant',
        text: `Expenses were managed, but transport costs totaled ₦${transportExpenses.toLocaleString()}. Keep an eye on delivery spending this week.`,
        type: 'warning'
      },
      {
        role: 'assistant',
        text: transportExpenses > 2000
          ? 'Recommended action: Compare local transportation options or organize combined supply trips to minimize transit overhead.'
          : 'Recommended action: Review product pricing layouts before high-traffic days to maximize net profit margins.',
        type: 'recommendation'
      }
    ];

    return res.status(200).json({
      metrics: { revenue: totalRevenue, expenses: totalExpenses, profit },
      messages: insightMessages
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process algorithmic insights text stream', details: error.message });
  }
};

// ==========================================
// 6. GET: AI DAILY PULSE INSIGHTS
// ==========================================
const getDailyPulseAI = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0,0,0,0);

    // Fetch today's transactions
    const todaysTransactions = await prisma.transaction.findMany({
      where: { userId: req.userId, date: { gte: today } },
      select: {
        id: true,
        type: true,
        description: true,
        amount: true,
        category: true,
        date: true
      }
    });

    // Fetch inventory data
    const inventory = await prisma.inventory.findMany({
      where: { userId: req.userId },
      select: {
        id: true,
        name: true,
        quantity: true,
        price: true
      }
    });

    // Transform for AI service
    const transactions = todaysTransactions.map(t => ({
      item: t.description,
      type: t.type === 'revenue' ? 'income' : 'expense',
      amount: t.amount,
      category: t.category,
      date: t.date.toISOString()
    }));

    const inventoryData = inventory.map(i => ({
      item: i.name,
      stock: i.quantity,
      units_sold_today: 0 // Can be calculated if needed
    }));

    // Call AI service for daily pulse
    const aiService = require('../services/aiService');
    const pulse = await aiService.generateDailyPulse(req.userId, transactions, inventoryData);

    return res.status(200).json({
      message: 'Daily pulse generated successfully',
      pulse: pulse.pulse
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate daily pulse', details: error.message });
  }
};

// ==========================================
// 7. POST: ASK AI BUSINESS QUESTION
// ==========================================
const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Fetch inventory context for AI
    const inventory = await prisma.inventory.findMany({
      where: { userId: req.userId },
      select: { name: true, quantity: true, price: true, category: true }
    });

    const inventoryContext = {
      items: inventory,
      totalItems: inventory.length,
      lowStockItems: inventory.filter(i => i.quantity < 10)
    };

    // Call AI service to answer question
    const aiService = require('../services/aiService');
    const answer = await aiService.askBusinessQuestion(req.userId, question, inventoryContext);

    return res.status(200).json({
      question,
      answer: answer.answer
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to answer question', details: error.message });
  }
};

module.exports = {
  getOverview,
  getRecentTransactions,
  getTrends,
  getExpenseBreakdown,
  getInsights,
  getDailyPulseAI,
  askQuestion
};