const express = require('express');
const { getSettings, updateSettings } = require('../controller/settingsController.js');
const verifyToken = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/settings', verifyToken, getSettings);
router.put('/settings', verifyToken, updateSettings);

module.exports = router;