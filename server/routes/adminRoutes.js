const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
    getDashboardStats,
    getAnalytics,
    getCustomers,
    getAllOrders
} = require('../controllers/adminController');

// All routes require both protection and admin role
router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.get('/analytics', getAnalytics);
router.get('/customers', getCustomers);
router.get('/orders', getAllOrders);

module.exports = router;
