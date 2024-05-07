import express from 'express';
import { uploadFile } from '../../middlewares/file-upload.middleware.js';
import ProductController from './product.controller.js';

// Create a router instance to handle product-related routes
const productRouter = express.Router();
// Create a controller instance to manage product-related operations
const productController = new ProductController();

// Define product routes
productRouter.get('/', productController.getAllProducts); // Route to get all produts
productRouter.get('/filter', productController.filterProducts); // Route to filter products
productRouter.get('/:id', productController.getProduct); // Route to get one specified product 
productRouter.post('/', uploadFile.single('image'), productController.addProduct); // Route to new add product
productRouter.put('/:id', uploadFile.single('image'), productController.updateProduct) // Route to update existing product
productRouter.delete('/:id', productController.deleteProduct) // Route to delete existing product

// Export product router as default
export default productRouter;
