const express = require('express');
const { getProductsController } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProductsController);

module.exports = router;