const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// 1. POST: ADD NEW ITEM TO INVENTORY
// ==========================================
const addItem = async (req, res) => {
  try {
    const { name, quantity, price, costPrice, category, lowStockThresh } = req.body;

    if (!name || quantity === undefined || !price) {
      return res.status(400).json({ error: 'Item name, quantity, and selling price are required.' });
    }

    const newItem = await prisma.inventory.create({
      data: {
        userId: req.userId,
        name: name.trim(),
        quantity: parseInt(quantity),
        price: parseFloat(price),
        costPrice: costPrice ? parseFloat(costPrice) : 0.0,
        category: category || 'Other',
        lowStockThresh: lowStockThresh ? parseInt(lowStockThresh) : 5
      }
    });

    return res.status(201).json({ message: 'Inventory item added successfully!', item: newItem });
  } catch (error) {
    return res.status(500).json({ error: 'Server error adding inventory item', details: error.message });
  }
};

// ==========================================
// 2. GET: FETCH ALL INVENTORY ITEMS (WITH ALERTS)
// ==========================================
const getInventory = async (req, res) => {
  try {
    const items = await prisma.inventory.findMany({
      where: { userId: req.userId },
      orderBy: { name: 'asc' }
    });

    // Smart data mapping: flag items that are running low on the fly for the frontend
    const mappedItems = items.map(item => ({
      ...item,
      isLowStock: item.quantity <= item.lowStockThresh
    }));

    return res.status(200).json(mappedItems);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching inventory', details: error.message });
  }
};

// ==========================================
// 3. PATCH: UPDATE STOCK DETAILS / RESTOCK
// ==========================================
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, costPrice, category, lowStockThresh } = req.body;

    const existingItem = await prisma.inventory.findFirst({
      where: { id, userId: req.userId }
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Inventory item not found or unauthorized' });
    }

    const updatedItem = await prisma.inventory.update({
      where: { id },
      data: {
        name: name ? name.trim() : undefined,
        quantity: quantity !== undefined ? parseInt(quantity) : undefined,
        price: price ? parseFloat(price) : undefined,
        costPrice: costPrice !== undefined ? parseFloat(costPrice) : undefined,
        category: category || undefined,
        lowStockThresh: lowStockThresh ? parseInt(lowStockThresh) : undefined
      }
    });

    return res.status(200).json({ message: 'Stock item updated successfully!', item: updatedItem });
  } catch (error) {
    return res.status(500).json({ error: 'Server error updating inventory item', details: error.message });
  }
};

// ==========================================
// 4. DELETE: REMOVE AN ITEM FROM INVENTORY
// ==========================================
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem = await prisma.inventory.findFirst({
      where: { id, userId: req.userId }
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Inventory item not found or unauthorized' });
    }

    await prisma.inventory.delete({ where: { id } });

    return res.status(200).json({ message: 'Item permanently deleted from inventory.' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error deleting inventory item', details: error.message });
  }
};

module.exports = {
  addItem,
  getInventory,
  updateItem,
  deleteItem
};

