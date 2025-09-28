const express = require('express');
const { getProductsController } = require('../controllers/productController');

const getAllProductsRouter = express.Router();

getAllProductsRouter.get('/', getProductsController);


module.exports = getAllProductsRouter;