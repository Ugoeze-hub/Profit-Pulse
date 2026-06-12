const express = require('express');
const {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary
} = require("../controller/transactionController");
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Summary route must sit above the /:id parameter route so Express doesn't confuse the word 'summary' for an ID string!
router.get('/summary', verifyToken, getSummary);

router.post('/', verifyToken, createTransaction);
router.get('/', verifyToken, getAllTransactions);
router.get('/:id', verifyToken, getTransactionById);
router.patch('/:id', verifyToken, updateTransaction);
router.delete('/:id', verifyToken, deleteTransaction);

module.exports = router;