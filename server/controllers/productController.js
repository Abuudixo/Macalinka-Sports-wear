const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
    try {
        let query = {};

        // Category filter
        if (req.query.category) {
            query.category = req.query.category.toLowerCase();
        }

        // Search by text
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Price range
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        // New arrivals filter
        if (req.query.isNew === 'true') {
            query.isNew = true;
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            count: products.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

const uploadToCloudinary = require('../utils/cloudinaryUpload');

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res, next) => {
    try {
        let productData = { ...req.body };

        // Parse sizes if it comes as a JSON string (from FormData)
        if (typeof productData.sizes === 'string') {
            try {
                productData.sizes = JSON.parse(productData.sizes);
            } catch (e) {
                // Keep as is if parsing fails, let Mongoose handle validation error
            }
        }

        // Handle image uploads if present
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            const imageUrls = await Promise.all(uploadPromises);
            productData.images = imageUrls;
        }

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res, next) => {
    try {
        let productData = { ...req.body };

        // Parse sizes if it comes as a JSON string (from FormData)
        if (typeof productData.sizes === 'string') {
            try {
                productData.sizes = JSON.parse(productData.sizes);
            } catch (e) {
                // Keep as is if parsing fails
            }
        }

        // Handle image uploads if present
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
            const imageUrls = await Promise.all(uploadPromises);

            // If images are provided, we can either replace or append. 
            // Here we replace the existing ones if new ones are uploaded.
            productData.images = imageUrls;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, productData, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
