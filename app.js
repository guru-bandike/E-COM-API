// Import necessary External modules
import express from 'express';

// Import necessary internal modules
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js'
import authUser from './src/middlewares/authUser.middleware.js';

// Create Express server instance
const app = express();

app.use(express.json()); // Parse incoming JSON bodies

// Mount the userRouter for handling user related routes
app.use('/api/user/', userRouter);
// Mount the productRouter for handling product related routes
app.use('/api/products/', authUser, productRouter);
// Mount the cartRouter for handling cart related routes
app.use('/api/cart/',authUser, cartRouter)

app.get('/', (req, res) => {
  res.send('Welcome to E-Commerce API');
});

// Export Express server instance as default
export default app;
