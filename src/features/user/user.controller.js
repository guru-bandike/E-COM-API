import UserModel from './user.model.js';
import generateToken from '../../helpers/tokenGenerator.helper.js';

// Define User Controller and export as default
export default class UserController {
  // Handle user signup request
  signUp(req, res) {
    const { name, email, password, role } = req.body; // Extract user information from request body
    const result = UserModel.signUp(name, email, password, role); // Sign up using user model

    // If user signed up successfully, send result with Created(201) status code
    if (result.success) res.status(201).send(result);
    // Otherwise, send result with Bad Request(400) status code
    else res.status(400).send(result);
  }

  // Handle user login request
  login(req, res) {
    const { email, password } = req.body; // Extract user credentials from request body

    const result = UserModel.login(email, password); // Login using user model

    // If user credentials are valid,
    if(result.success) {
      const jwtToken = generateToken(result.foundUser); // Generate JWT token
      result.JwtToken = jwtToken; // Append JWT token to the result object

      // Send result with OK(200) status code
      res.status(200).send(result);
    } else {
      // Otherwise, send result with Bad Request(400) status code
      res.status(400).send(result);
    }
  }
}
