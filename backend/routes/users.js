const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  currentUser,
  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');
const { regex } = require('../utils/constants');

const { REG } = regex;

router.get('/users', getUsers);
router.get('/users/me', currentUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), setUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REG),
  }),
}), setUserAvatar);

module.exports = router;
