import ProductModel from '../features/product/product.model.js';

const validateCartReq = (req, res, next) => {
  const { productId, quantity } = req.body;

  // Run validation and get errors if any
  const validationErrors = runValidation(productId, quantity);

  // If request details are valid, call next middleware
  if (validationErrors.length == 0) {
    next();
  } else {
    // Otherwise, send failure response with validation errors
    res.status(400).send({ success: false, msg: 'Request validation failed!', validationErrors });
  }
};

const runValidation = (productId, quantity) => {
  const validationErrors = [];

  if (!quantity) {
    validationErrors.push('Quantity is required!');
  }

  if (!productId) {
    validationErrors.push('Product ID is required!');
  }

  if (quantity && parseInt(quantity) < 1) {
    validationErrors.push('Quantity must be greater than or equal to One(1)!');
  }

  if (productId) {
    const isProductExist = ProductModel.isExists(productId);

    if (!isProductExist) {
      validationErrors.push('Product does not exists!');
    }
  }

  return validationErrors;
};

export default validateCartReq;
