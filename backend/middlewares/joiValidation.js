const { celebrate, Joi } = require('celebrate');

const { regex } = require('../utils/constants');

const { REG } = regex;

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const idUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const meUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarUser = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REG),
  }),
});

const cards = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(REG).required(),
  }),
});

const idCards = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const likesCards = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signin,
  signup,
  idUser,
  meUser,
  avatarUser,
  cards,
  idCards,
  likesCards,
};
