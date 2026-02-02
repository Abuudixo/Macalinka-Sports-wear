const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { submitContact } = require('../controllers/contactController');

router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('message').notEmpty().withMessage('Message is required'),
        validate
    ],
    submitContact
);

module.exports = router;
