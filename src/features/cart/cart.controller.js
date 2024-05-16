import CartModel from './cart.model.js';

// Define Cart controller class and export as default
export default class CartController {
  // Method to add cart item
  add(req, res) {
    const userId = req.userId; // Extract user ID from request
    const { productId, quantity } = req.body; // Extract product ID and quantity from request body

    const result = CartModel.addItem(userId, productId, parseInt(quantity)); // Add item using Cart model

    // If model is unable to add or update cart item, send failure response
    if (!result.success) {
      return res.status(500).send(result);
    }

    // If model created a new cart item and added to the user cart, send result with Created(201) status code
    if (result.doneOperation == 'create') {
      res.status(201).send(result);
    } else {
      // If the model updated existing cart item, send result with OK(200) status code
      res.status(200).send(result);
    }
  }

  // Method to remove cart item or reduce cart item quantity
  remove(req, res) {
    const userId = req.userId; // Extract user ID from request
    const { productId, quantity } = req.body; // Extract product ID and quantity from request body

    const result = CartModel.removeItem(userId, productId, parseInt(quantity)); // Remove item using Cart model

    // If successfully removed, send result with OK(200) status code
    if (result.success) return res.status(200).send(result);
    // Otherwise, send result with Bad Request(400) status code
    else return res.status(400).send(result);
  }
  // Method to retrieve cart items for a specific user
  getItemsByUserId(req, res) {
    const userId = req.userId; // Extract user ID from request

    const items = CartModel.getItemsByUserId(userId);
    return res.status(200).send(items);
  }
}
