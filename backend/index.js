const express = require('express');
const cors = require('cors');


const app = express();
const getAllProductsRouter = require('./routes/getProducts');
const getNewArrivalsRouter = require('./routes/getNewArrivals');
const getBestSellersRouter = require('./routes/getBestSeller');
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],   
    credentials: true
}));
app.use(express.json());
app.use('/api/products', getAllProductsRouter);
app.use('/api/products/new-arrivals', getNewArrivalsRouter);
app.use('/api/products/best-sellers', getBestSellersRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
