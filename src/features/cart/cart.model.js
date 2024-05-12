// Define CartModel class and export as default
export default class CartModel {
  // Method to add cart item
  static addItem(userId, productId, quantity) {
    // Find the index of the existing cart item for the given user and product
    const existingCartItemIndex = cartItems.findIndex((c) => c.userId == userId && c.productId == productId);

    // If the cart item doesn't exist, create new one and add to cart items
    if (existingCartItemIndex == -1) {
      const newCartItem = new CartItem(userId, productId, quantity);
      cartItems.push(newCartItem);
      return newCartItem;
    } else {
      // If cart item exists, update the quantity
      cartItems[existingCartItemIndex].quatity += quantity;
      return cartItems[existingCartItemIndex];
    }
  }

  // Method to remove cart item or reduce cart item quantity
  static removeItem(userId, productId, quantity) {
    // Find the index of the existing cart item for the given user and product
    const existingCartItemIndex = cartItems.findIndex((c) => c.productId == productId && c.userId == userId);

    // If the cart item doesn't exist, return a failure message indicating an invalid product ID
    if (existingCartItemIndex == -1) return { success: false, msg: 'Product does not exist in the user cart' };

    // Check if the requested removal quantity exceeds the existing cart item quantity
    // If so, return a failure message indicating the quantity exceeded
    if (cartItems[existingCartItemIndex].quatity < quantity)
      return { success: false, msg: 'Requested removal quantity exceeds the existing cart item quantity' };

    // Update cart item quantity
    cartItems[existingCartItemIndex].quatity -= quantity;

    // If the cart item quantity is equal to zero, remove cart item and return a success message
    if (cartItems[existingCartItemIndex].quatity == 0) {
      cartItems.splice(existingCartItemIndex, 1);
      return {
        status: true,
        msg: 'Cart item has been successfully removed',
      };
    } else {
      // Otherwise, just return a success message with current cart item quantity
      return {
        success: true,
        msg: 'Cart item quantity has been successfully reduced',
        cartItemCurrentQuantity: cartItems[existingCartItemIndex].quatity,
      };
    }
  }

  // Method to retrieve cart items for a specific user
  static getItemsByUserId(userId) {
    return cartItems.filter((c) => c.userId == userId);
  }
}

// Helper class to create cart items
class CartItem {
  // Initialize idCounter varialbe to track cart item ids
  static idCounter = 0;

  // Constructor to create cart item instances
  constructor(userId, productId, quantity) {
    this.id = ++CartItem.idCounter;
    this.userId = userId;
    this.productId = productId;
    this.quatity = quantity;
  }
}

// Existing cart items
let cartItems = [
  new CartItem(2, 10, 1),
  new CartItem(3, 15, 5),
  new CartItem(3, 1, 1),
  new CartItem(3, 2, 3),
  new CartItem(2, 22, 6),
];
