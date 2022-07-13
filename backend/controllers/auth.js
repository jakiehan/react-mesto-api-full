const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, avatar } = user;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-mesto', { expiresIn: '7d' });
      return res.send({
        name, email, avatar, token,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('пользователь с таким email уже существует');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then((newUser) => {
          const {
            // eslint-disable-next-line no-shadow
            name, about, avatar, email,
          } = newUser;
          res.send({
            name,
            about,
            avatar,
            email,
          });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
