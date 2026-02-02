const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: [100, 'Subtitle cannot be more than 100 characters']
    },
    sku: {
        type: String,
        required: [true, 'Please provide a SKU'],
        unique: true,
        trim: true,
        uppercase: true
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['men', 'women', 'kids']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    images: [{
        type: String
    }],
    sizes: [{
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL']
    }],
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    isNew: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add text index for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
