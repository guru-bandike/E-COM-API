import express from 'express';
import CartController from './cart.controller.js';
import ensureProductExists from '../../middlewares/ensureProductExists.validatoin.middleware.js'

// Create a router instance to handle cart-related routes
const cartRouter = express.Router()
const cartController = new CartController();

cartRouter.get('/', cartController.getItemsByUserId);
cartRouter.post('/', ensureProductExists, cartController.add);
cartRouter.delete('/', cartController.remove);

// Export cartRouter as default
export default cartRouter;

