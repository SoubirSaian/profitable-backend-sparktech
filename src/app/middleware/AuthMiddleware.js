import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import ApiError from "../../error/ApiError.js";
import { verifyToken } from "../../utils/jwtHelpers.js";


export function authorizeUserToken(req, res, next) {

    try {

      const authHeader = req.headers['authorization'];
    
      if (!authHeader) {
        // return res.status(401).json({ message: 'Authorization header missing' });
        throw new ApiError( 401, "You are not authorized for this role");
      }
    
      // Expecting format: "Bearer <token>"
      const token = authHeader.split(' ')[1];
    
      if (!token) {
        // return res.status(401).json({ message: 'Token missing' });
        throw new ApiError( 401,"Authorization token missing");
      }

      const verifyUser = verifyToken(token, config.jwt.secret);

      req.user = verifyUser;

      next();

  } catch (error) {
    next(error);
  }

}

// const payload = {
//   id: user._id,
//   email: user.email,
//   role: user.role, // should be 'admin' for admins
// };

// const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//admin authorization middleware
export const authorizeAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check for token presence
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user role is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    // Attach user info to request for downstream use
    req.user = decoded;

    next(); // Authorized
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
    // next(err);
  }
};


