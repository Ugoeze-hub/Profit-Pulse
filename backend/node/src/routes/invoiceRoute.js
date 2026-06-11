const express = require('express');
const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  sendInvoicePlaceholder,
  streamInvoicePDF
} = require('../controllers/invoiceController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createInvoice);
router.get('/', verifyToken, getAllInvoices);
router.get('/:id', verifyToken, getInvoiceById);
router.patch('/:id', verifyToken, updateInvoice);
router.post('/:id/send', verifyToken, sendInvoicePlaceholder);
router.get('/:id/pdf', verifyToken, streamInvoicePDF);

module.exports = router;