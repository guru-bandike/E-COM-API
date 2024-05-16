import jwt from 'jsonwebtoken';

// Define JWT authentication middleware
const authUser = (req, res, next) => {
  // Extract token
  const token = req.headers['authorization'];
  console.log(req.headers);

  // If token not found, send error response
  if (!token) {
    return res.status(401).send('Unauthorized!');
  }

  try {
    const secretKey = '2EA9EFB2A59DA773AEB58A8CA52A7';
    // Verify token using JWT
    const payload = jwt.verify(token, secretKey);

    // Attach user id to incoming request body for further usage
    req.userId = payload.userId;
  } catch (err) {
    // Handle token expairation error
    if (err.name == 'TokenExpiredError') {
      return res.status(401).send('Token Expaired!');
    }

    // Handle token invalid error
    if (err.name == 'JsonWebTokenError') {
      return res.status(401).send('Invalid Token!');
    }

    // Send unauthorized error for other errors
    return res.status(401).send('Unauthorized!');
  }

  // Call the next middleware if token is valid
  next();
};

// Export JWT authentication middleware as default
export default authUser;
