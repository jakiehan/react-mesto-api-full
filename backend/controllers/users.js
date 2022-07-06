const User = require('../models/user');
const { checkUserOrCard } = require('../middlewares/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      checkUserOrCard(res, user);
    })
    .catch(next);
};

const currentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      checkUserOrCard(res, user);
    })
    .catch(next);
};

const setUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      checkUserOrCard(res, user);
    })
    .catch(next);
};

const setUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      checkUserOrCard(res, user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  currentUser,
  setUserInfo,
  setUserAvatar,
};
