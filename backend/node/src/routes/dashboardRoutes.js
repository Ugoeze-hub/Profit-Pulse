const express = require('express');
const { 
  getOverview, 
  getRecentTransactions, 
  getTrends, 
  getExpenseBreakdown,
  getInsights,
  getDailyPulseAI,
  askQuestion
} = require('../controller/dashboardController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/overview', verifyToken, getOverview);
router.get('/recent-transactions', verifyToken, getRecentTransactions);
router.get('/trends', verifyToken, getTrends);
router.get('/expense-breakdown', verifyToken, getExpenseBreakdown);
router.get('/insights', verifyToken, getInsights);

// AI-integrated routes
router.get('/daily-pulse', verifyToken, getDailyPulseAI);
router.post('/ask-question', verifyToken, askQuestion);

module.exports = router;