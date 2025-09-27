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

module.exports = { getProductsController };