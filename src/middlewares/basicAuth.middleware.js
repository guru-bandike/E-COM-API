import UserModel from '../features/user/user.model.js';

// Define basicAuthorizer middleware
const basicAuthorizer = (req, res, next) => {
  // Extract authorization header from request body
  const authHeader = req.headers['authorization'];

  // If credentials not sent, send error response
  if (!authHeader) {
    return res.status(401).send('Authorization credentials not found!')
  }

  // Extract endcoded credentials
  const base64EncodedCreds = authHeader.replace('Basic ', '');

  // Decode credentials
  const decodedCreds = Buffer.from(base64EncodedCreds, 'base64').toString('utf8');

  // Create credentials array by splitting decodedCreds
  const creds = decodedCreds.split(':');

  // Extract Credentials
  const [email, password] = creds;

  // Find user with requested email
  const foundUser = UserModel.get(email);

  // If the user not found or user password is not matching, then send error message
  if (!foundUser || foundUser.password != password) {
    return res.status(401).send('Incorrect Credentials')
  }

  // If Credentials are matching, then call next middleware
  next();
};

// Export basicAuthorizer as default
export default basicAuthorizer;
