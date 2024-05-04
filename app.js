// Import necessary External modules
import express from 'express';

// Import necessary internal modules
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';

// Create Express server instance
const app = express();

app.use(express.json()); // Parse incoming JSON bodies
// Mount the productRouter for handling product related routes
app.use('/api/products/', basicAuthorizer, productRouter);
// Mount the userRouter for handling user related routes
app.use('/api/user/', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to E-Commerce API')
})

// Export Express server instance as default
export default app;
