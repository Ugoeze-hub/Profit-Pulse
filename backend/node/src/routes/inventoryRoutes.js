const express = require('express');
const { addItem, getInventory, updateItem, deleteItem } = require('../controllers/inventoryController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addItem);
router.get('/', verifyToken, getInventory);
router.patch('/:id', verifyToken, updateItem);
router.delete('/:id', verifyToken, deleteItem);

module.exports = router;