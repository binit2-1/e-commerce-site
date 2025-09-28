const express = require('express');
const { getBestSellersController } = require('../controllers/productController');

const getBestSellersRouter = express.Router();

getBestSellersRouter.get('/', getBestSellersController);

module.exports = getBestSellersRouter;