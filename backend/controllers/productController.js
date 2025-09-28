const pool = require('../db/pool');


async function getProductsController(req, res) {
    try {
        console.log('Fetching products from database...');
        const products = await pool.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getNewArrivalsController(req, res) {
    try {
        console.log('Fetching new arrivals from database...');
        const products = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching new arrivals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getBestSellersController(req, res) {
    try {
        console.log('Fetching best sellers from database...');
        const products = await pool.query('SELECT * FROM products ORDER BY rating DESC');
        res.json(products.rows);
    } catch (error) {
        console.error('Error fetching best sellers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getProductsController, getNewArrivalsController, getBestSellersController };