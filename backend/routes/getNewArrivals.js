const express = require('express');
const { getNewArrivalsController } = require('../controllers/productController');

const getNewArrivalsRouter = express.Router();

getNewArrivalsRouter.get('/', getNewArrivalsController);

module.exports = getNewArrivalsRouter;