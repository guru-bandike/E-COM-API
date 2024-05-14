import express from 'express';
import { uploadImage } from '../../middlewares/image-upload.middleware.js';
import ProductController from './product.controller.js';
import validateProductDetails from '../../middlewares/validateProductDetails.validation.middleware.js';
// Create a router instance to handle product-related routes
const productRouter = express.Router();
// Create a controller instance to manage product-related operations
const productController = new ProductController();

// Define product routes
productRouter.get('/', productController.getAllProducts); // Route to get all produts
productRouter.get('/filter', productController.filterProducts); // Route to filter products
productRouter.get('/:id', productController.getProduct); // Route to get one specified product 
productRouter.post('/', uploadImage.single('image'), validateProductDetails, productController.addProduct); // Route to new add product
productRouter.post('/rate', productController.rateProduct) // Route to rate product
productRouter.put('/:id', uploadImage.single('image'), validateProductDetails, productController.updateProduct); // Route to update existing product
productRouter.delete('/:id', productController.deleteProduct) // Route to delete existing product

// Export product router as default
export default productRouter;
