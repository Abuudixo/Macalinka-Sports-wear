const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const upload = require('../utils/upload');

router.route('/')
    .get(getProducts)
    .post(protect, admin, upload.array('images', 5), createProduct);

router.route('/:id')
    .get(getProduct)
    .put(protect, admin, upload.array('images', 5), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
