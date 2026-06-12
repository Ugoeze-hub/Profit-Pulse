const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ==========================================
// GET: FETCH PROFILE & SETTINGS
// ==========================================
const getSettings = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        businessName: true,
        email: true,
        phone: true,
        currency: true,
        language: true,
        notifications: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Server error fetching settings', details: error.message });
  }
};

// ==========================================
// PUT: SAVE PROFILE & PREFERENCES
// ==========================================
const updateSettings = async (req, res) => {
  try {
    const { businessName, email, phone, currency, language, notifications } = req.body;

    // Perform a highly clean dynamic update patch
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        businessName: businessName ? businessName.trim() : undefined,
        email: email ? email.toLowerCase().trim() : undefined,
        phone: phone ? phone.trim() : undefined,
        currency: currency || undefined,
        language: language || undefined,
        notifications: notifications || undefined // Stored instantly as raw JSON block
      },
      select: {
        businessName: true,
        email: true,
        phone: true,
        currency: true,
        language: true,
        notifications: true
      }
    });

    return res.status(200).json({
      message: 'Settings saved successfully!',
      settings: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error updating settings', details: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};