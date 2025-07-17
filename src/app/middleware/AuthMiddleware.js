import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import ApiError from "../../error/ApiError.js";
import { verifyToken } from "../../utils/jwtHelpers.js";


function authorizeJWT(req, res, next) {

    try {

      const authHeader = req.headers['authorization'];
    
      if (!authHeader) {
        // return res.status(401).json({ message: 'Authorization header missing' });
        throw new ApiError( httpStatus.UNAUTHORIZED, "You are not authorized for this role");
      }
    
      // Expecting format: "Bearer <token>"
      const token = authHeader.split(' ')[1];
    
      if (!token) {
        // return res.status(401).json({ message: 'Token missing' });
        throw new ApiError( httpStatus.UNAUTHORIZED,"Authorization token missing");
      }

      const verifyUser = verifyToken(token, config.jwt.secret);

      req.user = verifyUser;

      next();

  } catch (error) {
    next(error);
  }

}

export default authorizeJWT;
