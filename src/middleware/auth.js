const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../utils/AppError');

// if the role is organiser, then allow access to the route, else deny access
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Access denied. You do not have permission to perform this action.', 403));
    }
    next();
  };
};
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access denied. No token provided.', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token.', 401));
  }
};

module.exports = { authenticate, authorize };
