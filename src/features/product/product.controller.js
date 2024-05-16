import ProductModel from './product.model.js';

// Define Product controller class and export as default
export default class ProductController {
  // Method to serve all existing products
  getAllProducts(req, res) {
    const result = ProductModel.getAll(); // Get all product using product module
    res.status(200).send(result); // Serve all existing product
  }

  // Method to serve only one specified product
  getProduct(req, res) {
    const productId = req.params.id; // Extract product id from request parameters
    console.log(req.params.id);
    const result = ProductModel.get(productId); // Get product using product module

    // If product found, send success message with found product
    if(result.success) res.status(200).send(result);
    // Else, send failure message
    else res.status(404).send(result);
  }

  // Method to add new product
  addProduct(req, res) {
    // Extract product properties from request body
    const { name, desc, price, category } = req.body;
    const imageUrl = req.file.path; // Extract image path

    // Create requested product object with propriate data format
    const newProductObj = {
      name: name.toLowerCase(),
      desc,
      price: parseFloat(price),
      imageUrl,
      category: category.toLowerCase(),
    };

    const result = ProductModel.add(newProductObj); // Add new product using product model

    res.status(201).send(result); // Send success message with newly created product
  }

  // Method to update existing product
  updateProduct(req, res) {
    const { name, desc, price, category } = req.body; // Extract product properties from request body
    const id = req.params.id; // Extract product id from request parameters
    const imageUrl = req.file.path; // Extract image path

    // Create requested product object with propriate data format
    const updateProductObj = {
      id,
      name: name.toLowerCase(),
      desc,
      price: parseFloat(price),
      imageUrl,
      category: category.toLowerCase(),
    };

    const result = ProductModel.update(updateProductObj); // Update existing product using product model

    res.status(200).send(result); // Send success message with updated product
  }
  // Method to delet existing product
  deleteProduct(req, res) {
    const id = req.params.id; // Extract product id from request parameters

    const result = ProductModel.delete(id); // Delete requested product using product model

    // If successfully deleted, send result with OK(200) status code
    if (result.success) res.status(200).send(result);
    // Otherwise, send result with Bad Request(400) status code
    else res.status(400).send(result);
  }

  // Method to filter and serve products based on user filter criterias
  filterProducts(req, res) {
    const { name, minPrice, maxPrice, category } = req.query; // Extract all filter criterias from request

    // Get all filtered product using product model
    const result = ProductModel.filter(name, minPrice, maxPrice, category);

    res.status(200).send(result); // Send success message with filtered products
  }

  // Method to rate existing product
  rateProduct(req, res) {
    const userId = req.userId; // Extract user ID from request
    const { productId, rating } = req.body; // Extract requst details from request body

    // Rate product using Product Model
    const result = ProductModel.rate(userId, productId, rating);

    // If successfully updated rating, send result with OK(200) status code
    if (result.success) res.status(201).send(result);
    // Otherwise, send result with Bad Request(400) status code
    else res.status(400).send(result);
  }
}
