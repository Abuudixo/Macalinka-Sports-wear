const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get Cart
exports.getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) cart = { items: [] };
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next(error);
    }
};

// Add to Cart
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1, size = 'M' } = req.body;
        console.log(`Add to Cart: Product=${productId}, Qty=${quantity}, Size=${size}`);

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product: productId, quantity: Number(quantity), size }]
            });
        } else {
            const existingItem = cart.items.find(item =>
                item.product && item.product.toString() === productId && item.size === size
            );

            if (existingItem) {
                existingItem.quantity += Number(quantity);
            } else {
                cart.items.push({ product: productId, quantity: Number(quantity), size });
            }
            await cart.save();
        }

        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        console.error('SERVER ADD TO CART ERROR:', error);
        next(error);
    }
};

// Update Item
exports.updateCartItem = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const item = cart.items.id(req.params.itemId);
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

        item.quantity = Number(quantity);
        await cart.save();

        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        next(error);
    }
};

// Remove Item
exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();

        const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json({ success: true, data: updatedCart });
    } catch (error) {
        next(error);
    }
};

// Clear Cart
exports.clearCart = async (req, res, next) => {
    try {
        await Cart.findOneAndDelete({ user: req.user._id });
        res.status(200).json({ success: true, data: { items: [] } });
    } catch (error) {
        next(error);
    }
};
