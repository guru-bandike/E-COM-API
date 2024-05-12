import ProductModel from '../features/product/product.model.js';

const ensureProductExists = (req, res, next) => {
  const { productId } = req.body;

  const isExists = ProductModel.isExists(productId);

  // If product doesn't, send failure response
  if(!isExists) {
    const response = {
        success: false,
        msg: 'Product does not exists!'
    }
    return res.status(400).send(response);
  } 

  // Otherwise, call next middleware
  next()
};

export default ensureProductExists;
