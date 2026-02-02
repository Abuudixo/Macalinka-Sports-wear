const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus
} = require('../controllers/orderController');

// All routes require authentication
router.route('/')
    .get(protect, getOrders)
    .post(protect, createOrder);

router.route('/:id')
    .get(protect, getOrder);

router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
