const express = require('express');
const multer = require('multer');
const { addItem, getInventory, updateItem, deleteItem, predictRestockAI, parseMessage, scanReceiptImage } = require('../controller/inventoryController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Standard CRUD routes
router.post('/', verifyToken, addItem);
router.get('/', verifyToken, getInventory);
router.patch('/:id', verifyToken, updateItem);
router.delete('/:id', verifyToken, deleteItem);

// AI-integrated routes
router.post('/:itemId/predict-restock', verifyToken, predictRestockAI);
router.post('/parse-message', verifyToken, parseMessage);
router.post('/scan-receipt', verifyToken, upload.single('receipt'), scanReceiptImage);

module.exports = router;