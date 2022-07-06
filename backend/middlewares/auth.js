const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { cookies } = req;
  if (!cookies) {
    next(new Unauthorized('Вы не авторизованы'));
  }

  const token = cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-mesto');
  } catch (err) {
    next(new Unauthorized('Вы не авторизованы'));
  }

  req.user = payload;

  next();
};
