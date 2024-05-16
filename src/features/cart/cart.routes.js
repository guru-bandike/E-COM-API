import express from 'express';
import CartController from './cart.controller.js';
import validateCartReq from '../../middlewares/validateCartReq.validatoin.middleware.js';

// Create a router instance to handle cart-related routes
const cartRouter = express.Router()
const cartController = new CartController();

cartRouter.get('/', cartController.getItemsByUserId);
cartRouter.post('/', validateCartReq, cartController.add);
cartRouter.delete('/', validateCartReq, cartController.remove);

// Export cartRouter as default
export default cartRouter;

