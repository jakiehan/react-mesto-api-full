const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { cards, idCards, likesCards } = require('../middlewares/joiValidation');

router.get('/cards', getCards);
router.post('/cards', cards, createCard);
router.delete('/cards/:cardId', idCards, deleteCard);
router.put('/cards/:cardId/likes', likesCards, likeCard);
router.delete('/cards/:cardId/likes', likesCards, dislikeCard);

module.exports = router;
