const express = require('express');
const cors = require('cors');


const app = express();
const getProductsRouter = require('./routes/getProducts');
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],   
    credentials: true
}));
app.use(express.json());
app.use('/api/products', getProductsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
