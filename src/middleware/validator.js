const AppError = require('../utils/AppError');

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2)
    return next(new AppError("'name' must be at least 2 characters", 400));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return next(new AppError("'email' must be a valid email address", 400));

  if (!password || password.length < 6)
    return next(new AppError("'password' must be at least 6 characters", 400));

  next();
};

module.exports = { validateUser };
