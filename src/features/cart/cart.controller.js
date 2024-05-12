import CartModel from './cart.model.js';

// Define Cart controller class and export as default
export default class CartController {
  // Method to add cart item
  add(req, res) {
    const userId = req.userId; // Extract user ID from request
    const { productId, quantity } = req.body; // Extract product ID and quantity from request body

    const addedItem = CartModel.addItem(userId, productId, quantity); // Add item using Cart model
    return res.status(201).send(addedItem);
  }

  // Method to remove cart item or reduce cart item quantity
  remove(req, res) {
    const userId = req.userId; // Extract user ID from request
    const { productId, quantity } = req.body; // Extract product ID and quantity from request body

    const result = CartModel.removeItem(userId, productId, quantity); // Remove item using Cart model

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
