import ProductModel from './product.model.js';

// Define Product controller class and export as default
export default class ProductController {
  // Method to serve all existing products
  getAllProducts(req, res) {
    const allProducts = ProductModel.getAll(); // Get all product from product module
    res.status(200).send(allProducts); // Serve all existing product
  }

  // Method to serve only one specified product
  getProduct(req, res) {
    const productId = req.params.id; // Extract product id from request parameters
    const foundProduct = ProductModel.get(productId); // Get product from product module

    res.status(200).send(foundProduct); // Serve requested product
  }

  // Method to add new product
  addProduct(req, res) {
    // Extract product properties from request body
    const { name, desc, price, category, sizes } = req.body;
    const imageUrl = req.file.path; // Extract image path

    // Create requested product object with propriate data format
    const newProductObj = {
      name: name.toLowerCase(),
      desc,
      price: parseFloat(price),
      imageUrl,
      category: category.toLowerCase(),
      sizes: sizes.split(','),
    };

    const addedProduct = ProductModel.add(newProductObj); // Add new product using product model

    // Create response object
    const response = {
      message: 'The resource has been successfully added!',
      addedProduct,
    };

    res.status(201).send(response); // Send the response to the client
  }

  // Method to update existing product
  updateProduct(req, res) {
    const { name, desc, price, category, sizes } = req.body; // Extract product properties from request body
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
      sizes: sizes.split(','),
    };

    const updatedProduct = ProductModel.update(updateProductObj); // Update existing product using product model

    // Create response object
    const response = {
      message: 'The resource has been successfully updated!',
      updatedProduct,
    };

    res.status(200).send(response); // Send the response to the client
  }

  deleteProduct(req, res) {
    const id = req.params.id; // Extract product id from request parameters

    const deletedProduct = ProductModel.delete(id); // Delete requested product using product model

    // Create response object
    const response = {
      message: 'The resource has been successfully deleted!',
      deletedProduct,
    };

    res.status(200).send(response); // Send the response to the client
  }

  // Method to filter and serve products based on user filter criterias
  filterProducts(req, res) {
    const { name, minPrice, maxPrice, category } = req.query; // Extract all filter criterias from request

    // Get all filtered product using product model
    const filteredProducts = ProductModel.filter(name, minPrice, maxPrice, category);

    // Create response object
    const response = {
      message: 'The filteration of product has been successfully completed!',
      filteredProducts
    };

    res.status(200).send(response); // Send the response to the client
  }
}
