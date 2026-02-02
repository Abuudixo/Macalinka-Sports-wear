const Address = require('../models/Address');

// @desc    Get user's addresses
// @route   GET /api/addresses
// @access  Private
exports.getAddresses = async (req, res, next) => {
    try {
        const addresses = await Address.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: addresses.length,
            data: addresses
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add address
// @route   POST /api/addresses
// @access  Private
exports.addAddress = async (req, res, next) => {
    try {
        req.body.user = req.user.id;

        // If this is set as default, unset other defaults
        if (req.body.isDefault) {
            await Address.updateMany(
                { user: req.user.id },
                { isDefault: false }
            );
        }

        const address = await Address.create(req.body);

        res.status(201).json({
            success: true,
            data: address
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
exports.updateAddress = async (req, res, next) => {
    try {
        let address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Check ownership
        if (address.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        // If setting as default, unset others
        if (req.body.isDefault) {
            await Address.updateMany(
                { user: req.user.id, _id: { $ne: req.params.id } },
                { isDefault: false }
            );
        }

        address = await Address.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: address
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
exports.deleteAddress = async (req, res, next) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Check ownership
        if (address.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized'
            });
        }

        await Address.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
