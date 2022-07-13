const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    if (!authorization.startsWith('Bearer ')) {
      throw new Unauthorized('Вы не авторизованы');
    }

    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-mesto');
    } catch (err) {
      throw new Unauthorized('Вы не авторизованы');
    }

    req.user = payload;

    next();
  }
};
