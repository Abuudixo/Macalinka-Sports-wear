const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: [true, 'Please provide a full name'],
        trim: true
    },
    street: {
        type: String,
        required: [true, 'Please provide a street address'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'Please provide a city'],
        trim: true
    },
    state: {
        type: String,
        required: [true, 'Please provide a state'],
        trim: true
    },
    zip: {
        type: String,
        required: [true, 'Please provide a zip code'],
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Address', addressSchema);
