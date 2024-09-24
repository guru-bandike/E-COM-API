import jwt from 'jsonwebtoken';

// Define generate token funtion
const generateToken = (userId) => {
  const secretKey = '2EA9EFB2A59DA773AEB58A8CA52A7';

  // Gererate token using JWT
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: '7d',
  });

  return token; // Return generated token
};

// Export generateToken middleware as default
export default generateToken;
