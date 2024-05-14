import { body, validationResult } from 'express-validator';
import fs from 'fs';

const validateProductDetails = async (req, res, next) => {
  // Defain validaton rules
  const rules = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name should not be empty!')
      .isLength({ min: 3 })
      .withMessage('Name should atleast contain 3 charectors!'),
    body('desc')
      .trim()
      .notEmpty()
      .withMessage('Description should not be empty!')
      .isLength({ min: 10 })
      .withMessage('Description should atleast contain 10 charectors!'),
    body('price').isFloat({ gt: 0 }).withMessage('Price should be greater than zero!'),
    body('image').custom((value, { req }) => {
      // If product image file has been reject by Multer while filtering, throw a validation error
      if (req.isFileRejected) {
        throw new Error('Only image files are allowed!');
      }
      // If the product image is not uploaded, throw a validatoin error
      if (!req.file) {
        throw new Error('Product image is required');
      }
      // If file uploaded, Continue without an error
      return true;
    }),
    body('category')
      .notEmpty({ ignore_whitespace: true })
      .withMessage('Category should not be empty!')
      .isIn(productCategoryList)
      .withMessage('Invalid category!'),
  ];

  // Run all rules
  await Promise.all(
    rules.map((rule) => {
      return rule.run(req);
    })
  );

  // Collect validation errors
  const validationErrors = validationResult(req);

  // If there are no validation errors, proceed to the next middleware
  if (validationErrors.isEmpty()) {
    next();
  } else {
    // If validation errors exist:
    // If a product image is uploaded, delete it because the user will send a new request with same image again
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
      });
    }

    // Send a failure response with validation error messages
    res
      .status(400)
      .send({ success: false, msg: 'Validation failed', validationErrors: validationErrors.array().map((e) => e.msg) });
  }
};

// Export validateProductDetails middleware
export default validateProductDetails;

// List of product categories
const productCategoryList = [
  'furniture',
  'fitness',
  'kitchen appliances',
  'accessories',
  'shoes',
  'clothing',
  'electronics',
];
