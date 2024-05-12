import UserModel from './user.model.js';
import generateToken from './helpers/tokenGenerator.helper.js';

// Define User Controller and export as default
export default class UserController {
  // Handle user signup request
  signUp(req, res) {
    const { name, email, password, role } = req.body; // Extract user information from request body
    const newuser = UserModel.signUp(name, email, password, role); // Sign up using user model and get newly created user

    // Create response object
    const response = {
      message: 'User signed up successfully',
      user: newuser,
    };

    res.status(201).send(response); // Send response to the client
  }

  // Handle user signin request
  signIn(req, res) {
    const { email, password } = req.body; // Extract user credentials from request body

    const foundUser = UserModel.signIn(email, password);

    if (!foundUser) {
      return res.status(401).send('Invalid User Credentials!');
    }

    const token = generateToken(foundUser);

    res.status(201).send(token);
  }
}
