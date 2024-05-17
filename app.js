// Import necessary External modules
import express from 'express';
import cors from 'cors';
import swagger from 'swagger-ui-express';

// Import necessary internal modules
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js';
import welcomeUser from './src/middlewares/welcomeUser.middleware.js'
import authUser from './src/middlewares/authUser.middleware.js';
import requestLogger from './src/middlewares/logger.middleware.js';
import handleInvalidRoute from './src/middlewares/invalidRouteHandler.middleware.js';
import getApiDoc from './src/helpers/getApiDoc.helper.js';

// Create Express server instance
const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json()); // Parse incoming JSON bodies
app.use(requestLogger); // Log every incoming request

// Default route
app.get('/', welcomeUser);

app.use('/api-docs', swagger.serve, swagger.setup(await getApiDoc()));
// Mount the userRouter for handling user related routes
app.use('/api/user/', userRouter);
// Mount the productRouter for handling product related routes
app.use('/api/products/', authUser, productRouter);
// Mount the cartRouter for handling cart related routes
app.use('/api/cart/', authUser, cartRouter);

// Handle invalid routes
app.use(handleInvalidRoute);

// Export Express server instance as default
export default app;
