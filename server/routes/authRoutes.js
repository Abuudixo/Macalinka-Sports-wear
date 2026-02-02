const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const {
    register,
    login,
    getMe,
    updateProfile
} = require('../controllers/authController');

router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        validate
    ],
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
        validate
    ],
    login
);

router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

module.exports = router;
