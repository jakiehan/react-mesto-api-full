const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

const { devConfig } = require('../utils/constants');

const { JWT_SECRET_DEV } = devConfig;

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { name, avatar, _id } = user;
      const token = jwt.sign({ _id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
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
          User.findById(newUser._id)
            .select('-password')
            .then((u) => res.send(u));
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
