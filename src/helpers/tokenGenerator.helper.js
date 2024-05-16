import jwt from 'jsonwebtoken';

// Define generate token funtion
const generateToken = (user) => {
  
  const secretKey = '2EA9EFB2A59DA773AEB58A8CA52A7';

  // Gererate token using JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: '7d',
  });

  return token; // Return generated token
};

// Export generateToken middleware as default
export default generateToken;
