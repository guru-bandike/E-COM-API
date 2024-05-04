// Import necessary External modules
import express from 'express';

// Import necessary internal modules
import productRouter from './src/features/product/product.routes.js';

// Create Express server instance
const app = express();

app.use(express.json()); // Parse incoming JSON bodies
// Mount the productRouter for handling product related routes
app.use('/api/products/', productRouter);

app.get('/', (req, res) => {
    res.send('Welcome to E-Commerce API')
})

// Export Express server instance as default
export default app;
