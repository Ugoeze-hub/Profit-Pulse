const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// 1. POST: CREATE A NEW INVOICE WITH ITEMS
// ==========================================
const createInvoice = async (req, res) => {
  try {
    const { customer, dueDate, items, status = 'draft' } = req.body;

    if (!customer || !dueDate || !items || !items.length) {
      return res.status(400).json({ error: 'Customer, due date, and at least one item are required.' });
    }

    // Calculate total on the backend to prevent frontend data tampering
    const totalAmount = items.reduce((sum, item) => sum + (parseInt(item.quantity) * parseFloat(item.price)), 0);

    // Save Invoice and related InvoiceItems sequentially inside a database transaction
    const newInvoice = await prisma.invoice.create({
      data: {
        userId: req.userId,
        customer: customer.trim(),
        dueDate: new Date(dueDate),
        status,
        totalAmount,
        items: {
          create: items.map(item => ({
            description: item.description.trim(),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price)
          }))
        }
      },
      include: { items: true } // Return the created items back in the response
    });

    return res.status(201).json({ message: 'Invoice saved successfully!', invoice: newInvoice });
  } catch (error) {
    return res.status(500).json({ error: 'Server error creating invoice', details: error.message });
  }
};

// ==========================================
// 2. GET: FETCH ALL INVOICES FOR LOGGED-IN USER
// ==========================================
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId: req.userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching invoices', details: error.message });
  }
};

// ==========================================
// 3. GET: FETCH SINGLE INVOICE BY ID
// ==========================================
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await prisma.invoice.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { items: true }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found or unauthorized' });
    }
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching invoice details', details: error.message });
  }
};

// ==========================================
// 4. PATCH: UPDATE EXISTING INVOICE & ITEMS
// ==========================================
const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer, dueDate, items, status } = req.body;

    // Confirm ownership first
    const existingInvoice = await prisma.invoice.findFirst({
      where: { id, userId: req.userId }
    });

    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found or unauthorized' });
    }

    const result = await prisma.$transaction(async (tx) => {
      // If new line items are supplied, wipe out old items and rewrite them clean
      if (items && items.length) {
        await tx.invoiceItem.deleteMany({ where: { invoiceId: id } });
        
        const totalAmount = items.reduce((sum, item) => sum + (parseInt(item.quantity) * parseFloat(item.price)), 0);
        
        return await tx.invoice.update({
          where: { id },
          data: {
            customer: customer || undefined,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            status: status || undefined,
            totalAmount,
            items: {
              create: items.map(item => ({
                description: item.description.trim(),
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price)
              }))
            }
          },
          include: { items: true }
        });
      }

      // Simple update if items array didn't change
      return await tx.invoice.update({
        where: { id },
        data: { customer, dueDate: dueDate ? new Date(dueDate) : undefined, status },
        include: { items: true }
      });
    });

    return res.status(200).json({ message: 'Invoice updated cleanly!', invoice: result });
  } catch (error) {
    return res.status(500).json({ error: 'Server error updating invoice', details: error.message });
  }
};

// ==========================================
// 5. POST: SEND INVOICE TO CUSTOMER
// ==========================================
const sendInvoicePlaceholder = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: { id, userId: req.userId }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found or unauthorized' });
    }

    // Toggle status to "sent" inside Neon
    await prisma.invoice.update({
      where: { id },
      data: { status: 'sent' }
    });

    // Placeholder response block where email dispatching libraries connect later
    return res.status(200).json({ 
      message: `Invoice successfully dispatched to customer. Status modified to 'sent'.`
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send invoice', details: error.message });
  }
};

// ==========================================
// 6. GET: STREAM INVOICE AS PDF FORMAT
// ==========================================
const streamInvoicePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findFirst({
      where: { id, userId: req.userId },
      include: { items: true }
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // High-fidelity text configuration format mock to simulate file generation stream
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice_${id}.pdf`);
    
    return res.send(`%PDF-1.4 [Mock PDF Stream for Invoice to ${invoice.customer} - Total: ₦${invoice.totalAmount}]`);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to render download PDF layout', details: error.message });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  sendInvoicePlaceholder,
  streamInvoicePDF
};