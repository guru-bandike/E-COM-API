import { body, validationResult } from 'express-validator';

const validateUserDetails = async (req, res, next) => {
  // Define validation rules
  const validationRules = [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name should not be empty!')
      .isLength({ min: 3 })
      .withMessage('Name should atleast contain 3 charectors!'),
    body('email').isEmail().withMessage('Invalid email!'),
    body('password')
      .isStrongPassword()
      .withMessage(
        'Password should be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character!'
      ),
    body('role')
      .notEmpty({ ignore_whitespace: true })
      .withMessage('Role should not be empty!')
      .isIn(userRoles)
      .withMessage('Invalid user role!'),
  ];

  // Run all validation rules
  await Promise.all(
    validationRules.map((rule) => {
      return rule.run(req);
    })
  );

  // Get validation errors
  const validationErrors = validationResult(req);

  // If there are no validation errors, proceed to the next middleware
  if (validationErrors.isEmpty()) {
    next();
  } else {
    // Otherwise, Send a failure response with validation error messages
    res.status(400).send({
      success: false,
      msg: 'Invalid user Details!',
      validationErrors: validationErrors.array().map((e) => e.msg),
    });
  }
};

export default validateUserDetails;

// User roles list
const userRoles = ['seller', 'customer'];
