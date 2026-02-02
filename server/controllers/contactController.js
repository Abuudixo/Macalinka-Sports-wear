const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Thank you! We will get back to you soon.',
            data: contact
        });
    } catch (error) {
        next(error);
    }
};
