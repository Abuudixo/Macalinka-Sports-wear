const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res, next) => {
    try {
        const totalProducts = await Product.countDocuments();
        const lowStockProducts = await Product.countDocuments({ stock: { $lt: 10 } });
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
        const customerCount = await User.countDocuments({ role: 'user' });

        // Calculate total inventory value (sum of price * stock for all products)
        const products = await Product.find();
        const inventoryValue = products.reduce((acc, prod) => acc + (prod.price * prod.stock), 0);

        res.status(200).json({
            success: true,
            data: {
                totalProducts,
                lowStockAlerts: lowStockProducts,
                inventoryValue: totalRevenue, // Lifetime Revenue
                stockValue: inventoryValue,   // Potential value of current stock
                totalOrders: orders.length,
                totalCustomers: customerCount
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get sales analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res, next) => {
    try {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);

        // Sales trend (Daily)
        const salesTrend = await Order.aggregate([
            { $match: { createdAt: { $gte: last7Days } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    revenue: { $sum: "$total" },
                    orders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Sales by Category
        const salesByCategory = await Order.aggregate([
            { $unwind: "$items" },
            {
                $lookup: {
                    from: "products",
                    localField: "items.product",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            { $unwind: "$productInfo" },
            {
                $group: {
                    _id: "$productInfo.category",
                    revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                    count: { $sum: "$items.quantity" }
                }
            }
        ]);

        // Top Selling Products
        const topProducts = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.product",
                    name: { $first: "$items.name" },
                    revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
                    sold: { $sum: "$items.quantity" },
                    image: { $first: "$items.image" }
                }
            },
            { $sort: { sold: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            success: true,
            data: {
                salesTrend,
                salesByCategory,
                topProducts
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all customers
// @route   GET /api/admin/customers
// @access  Private/Admin
exports.getCustomers = async (req, res, next) => {
    try {
        const customers = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders (admin version with filters)
// @route   GET /api/admin/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};
