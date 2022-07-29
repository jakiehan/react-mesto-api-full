const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const checkUrl = (url, msg) => {
  if (validator.isURL(url)) {
    return url;
  }
  return msg.message('Передан некорректный URL');
};

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
    avatar: Joi.string().custom(((value, helpers) => checkUrl(value, helpers))),
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
    avatar: Joi.string().custom(((value, helpers) => checkUrl(value, helpers))),
  }),
});

const cards = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(((value, helpers) => checkUrl(value, helpers))),
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
