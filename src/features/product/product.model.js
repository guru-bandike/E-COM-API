// Define product model and Export as default
export default class ProductModel {
  // Initialize idCounter varialbe to track product ids
  static idCounter = 0;

  // Constructor to create ProductModel instances
  constructor(name, desc, price, imageUrl, category) {
    this.id = ++ProductModel.idCounter;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
  }

  // Get all products
  static getAll() {
    return { success: true, msg: "All existing products", AllProducts: products }; // Return all existing products
  }

  // Get product by ID
  static get(id) {
    const targetProduct = products.find((p) => p.id == id); // Find target product
    // If target product found, return success message with found product
    if (targetProduct) return { success: true, msg: 'Requested product successfully found', product: targetProduct };
    // Else return failure message
    else return { success: false, msg: 'Requested product does not exist!' };
  }

  // Add new product
  static add(newProductObj) {
    // Create new product model instances with user requested data
    const newProduct = new ProductModel(
      newProductObj.name,
      newProductObj.desc,
      newProductObj.price,
      newProductObj.imageUrl,
      newProductObj.category
    );

    products.push(newProduct); // Add to the product array

    // Return success message with newly created product
    return { success: true, msg: 'Product has been successfully Created', createdProduct: newProduct };
  }

  // Update existing product
  static update(updatedProduct) {
    const targetIndex = products.findIndex((p) => p.id == updatedProduct.id); // Get target product index
    products[targetIndex] = updatedProduct; // Update specified product
    // Return success message with updated product
    return { success: true, msg: 'Product has been successfully updated', updatedProduct };
  }

  // Delete existing product
  static delete(id) {
    const targetIndex = products.findIndex((p) => p.id == id); // Find target product index

    // If requested product doesn't exists, return failure message
    if (targetIndex == -1) {
      return {
        success: false,
        msg: 'Invalid product ID!',
      };
    }

    const deletedProductArray = products.splice(targetIndex, 1); // Delete and get target product in an array
    const deletedProduct = deletedProductArray[0]; // Extract deleted product from array

    // Return seccess message with deleted product
    return { success: true, msg: 'The product has been successfully deleted', deletedProduct };
  }
  // Filter products
  static filter(name, minPrice, maxPrice, category) {
    // Filter products with specified criteria
    const filteredProducts = products.filter((p) => {
      // Check if the product matches the filtering criteria
      return (
        // Check if product name is equal to name if specified or ignore otherwise
        (!name || p.name == name) &&
        // Check if product price is greater than or equal to minPrice if specified or ignore otherwise
        (!minPrice || p.price >= minPrice) &&
        // Check if product price is less than or equal to maxPrice if specified or ignore otherwise
        (!maxPrice || p.price <= maxPrice) &&
        // Check if product category is equal to category if specified or ignore otherwise
        (!category || p.category == category)
      );
    });

    return { success: true, msg: 'Filteratoin has been successfully completed', filteredProducts };
  }
  // Rate product
  static rate(userId, productId, rating) {
    // Find target product index
    const productIndex = products.findIndex((p) => p.id == productId);

    // If product does not exist, return failure message
    if (productIndex == -1) {
      return { success: false, msg: 'Invalid product ID!' };
    }

    // If the product does not have a ratings array, create one
    if (!products[productIndex].ratings) {
      products[productIndex].ratings = [];
    }

    // Find the index of existing rating for the user in the product's ratings array
    const existingRatingIndex = products[productIndex].ratings.findIndex((r) => r.userId == userId);

    // If the user has already rated the product, update the existing rating
    if (existingRatingIndex >= 0) {
      products[productIndex].ratings[existingRatingIndex].rating = rating;
    } else {
      // If the user has not rated the product yet, add a new rating entry
      products[productIndex].ratings.push({ userId, rating });
    }

    return { success: true, msg: 'Rating has been updated successfully', rating };
  }

  // Method to check product existence
  static isExists(id) {
    return products.some((p) => p.id == id);
  }
}

// Existing products
let products = [
  new ProductModel(
    'smartphone',
    'high-performance smartphone with advanced features.',
    699.99,
    'https://example.com/images/smartphone.jpg',
    'electronics'
  ),
  new ProductModel(
    'laptop',
    'powerful laptop for work and entertainment.',
    1299.99,
    'https://example.com/images/laptop.jpg',
    'electronics'
  ),
  new ProductModel(
    't-shirt',
    'casual cotton t-shirt for everyday wear.',
    19.99,
    'https://example.com/images/t-shirt.jpg',
    'clothing'
  ),
  new ProductModel(
    'dress shirt',
    'formal dress shirt for professional occasions.',
    39.99,
    'https://example.com/images/dress-shirt.jpg',
    'clothing'
  ),
  new ProductModel(
    'running shoes',
    'lightweight running shoes for fitness enthusiasts.',
    79.99,
    'https://example.com/images/running-shoes.jpg',
    'shoes'
  ),
  new ProductModel(
    'bluetooth speaker',
    'portable bluetooth speaker for music on-the-go.',
    49.99,
    'https://example.com/images/bluetooth-speaker.jpg',
    'electronics'
  ),
  new ProductModel(
    'jeans',
    'classic denim jeans for a timeless look.',
    29.99,
    'https://example.com/images/jeans.jpg',
    'clothing'
  ),
  new ProductModel(
    'sunglasses',
    'stylish sunglasses for sun protection.',
    39.99,
    'https://example.com/images/sunglasses.jpg',
    'accessories'
  ),
  new ProductModel(
    'fitness tracker',
    'track your fitness goals with this advanced tracker.',
    89.99,
    'https://example.com/images/fitness-tracker.jpg',
    'electronics'
  ),
  new ProductModel(
    'backpack',
    'durable backpack for carrying essentials.',
    49.99,
    'https://example.com/images/backpack.jpg',
    'accessories'
  ),
  new ProductModel(
    'wireless headphones',
    'high-quality wireless headphones for immersive sound.',
    149.99,
    'https://example.com/images/wireless-headphones.jpg',
    'electronics'
  ),
  new ProductModel(
    'graphic t-shirt',
    'cool graphic print t-shirt for a trendy look.',
    24.99,
    'https://example.com/images/graphic-t-shirt.jpg',
    'clothing'
  ),
  new ProductModel(
    'gaming mouse',
    'precision gaming mouse with customizable buttons.',
    79.99,
    'https://example.com/images/gaming-mouse.jpg',
    'electronics'
  ),
  new ProductModel(
    'leather wallet',
    'stylish leather wallet with multiple compartments.',
    34.99,
    'https://example.com/images/leather-wallet.jpg',
    'accessories'
  ),
  new ProductModel(
    'sports watch',
    'water-resistant sports watch with fitness tracking.',
    109.99,
    'https://example.com/images/sports-watch.jpg',
    'accessories'
  ),
  new ProductModel(
    'duffle bag',
    'spacious duffle bag for travel and gym.',
    59.99,
    'https://example.com/images/duffle-bag.jpg',
    'accessories'
  ),
  new ProductModel(
    'wireless keyboard',
    'sleek wireless keyboard for comfortable typing.',
    89.99,
    'https://example.com/images/wireless-keyboard.jpg',
    'electronics'
  ),
  new ProductModel(
    'denim jacket',
    'classic denim jacket for casual style.',
    49.99,
    'https://example.com/images/denim-jacket.jpg',
    'clothing'
  ),
  new ProductModel(
    'smartwatch',
    'smartwatch with health monitoring features.',
    199.99,
    'https://example.com/images/smartwatch.jpg',
    'electronics'
  ),
  new ProductModel(
    'sneakers',
    'comfortable sneakers for everyday wear.',
    69.99,
    'https://example.com/images/sneakers.jpg',
    'shoes'
  ),
  new ProductModel(
    'coffee maker',
    'automatic coffee maker for brewing your favorite coffee.',
    79.99,
    'https://example.com/images/coffee-maker.jpg',
    'kitchen appliances'
  ),
  new ProductModel(
    'vintage watch',
    'elegant vintage watch with a leather strap.',
    149.99,
    'https://example.com/images/vintage-watch.jpg',
    'accessories'
  ),
  new ProductModel(
    'printed dress',
    'fashionable printed dress for special occasions.',
    69.99,
    'https://example.com/images/printed-dress.jpg',
    'clothing'
  ),
  new ProductModel(
    'wireless earbuds',
    'compact wireless earbuds for music and calls.',
    99.99,
    'https://example.com/images/wireless-earbuds.jpg',
    'electronics'
  ),
  new ProductModel(
    'digital camera',
    'high-resolution digital camera for capturing moments.',
    399.99,
    'https://example.com/images/digital-camera.jpg',
    'electronics'
  ),
  new ProductModel(
    'leather belt',
    'genuine leather belt for a stylish look.',
    29.99,
    'https://example.com/images/leather-belt.jpg',
    'accessories'
  ),
  new ProductModel(
    'yoga mat',
    'non-slip yoga mat for comfortable workouts.',
    49.99,
    'https://example.com/images/yoga-mat.jpg',
    'fitness'
  ),
  new ProductModel(
    'bluetooth headset',
    'hands-free bluetooth headset for calls on-the-go.',
    59.99,
    'https://example.com/images/bluetooth-headset.jpg',
    'electronics'
  ),
  new ProductModel(
    'dining table',
    'sturdy dining table for family gatherings.',
    299.99,
    'https://example.com/images/dining-table.jpg',
    'furniture'
  ),
  new ProductModel(
    'winter jacket',
    'warm winter jacket with insulation for cold weather.',
    89.99,
    'https://example.com/images/winter-jacket.jpg',
    'clothing'
  ),
];
