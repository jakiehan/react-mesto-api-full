const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');
const Forbidden = require('../errors/Forbidden');
const Conflict = require('../errors/Conflict');

const handleErrors = (err) => {
  switch (err.name) {
    case 'NotFound':
      return new NotFound(`Запрашиваемый ресурс не найден: ${err.message}`);
    case 'BadRequest':
    case 'CastError':
    case 'ValidationError':
      return new BadRequest(`Некорректные данные: ${err.message}`);
    case 'Unauthorized':
      return new Unauthorized(`Ошибка: ${err.message}`);
    case 'Forbidden':
      return new Forbidden(`Нет прав на совершение операции: ${err.message}`);
    case 'Conflict':
      return new Conflict(`Ошибка: ${err.message}`);
    default:
      return err;
  }
};

const checkUserOrCard = (res, userOrCard) => {
  if (!userOrCard) {
    throw new NotFound('Not Found');
  }
  res.send({ data: userOrCard });
};

const handleDeleteCard = (card, id) => {
  if (!card) {
    throw new NotFound('Такой карточки нет!');
  }
  if (card.owner.toHexString() !== id) {
    throw new Forbidden('Вы не можете удалить чужую карточку');
  }
  return card;
};

module.exports = {
  handleErrors,
  checkUserOrCard,
  handleDeleteCard,
};
