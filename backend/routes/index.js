const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/auth');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const { signin, signup } = require('../middlewares/joiValidation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', signin, login);
router.post('/signup', signup, createUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Not Found'));
});

module.exports = router;
