const router = require('express').Router();
const {
  getUsers,
  getUser,
  currentUser,
  setUserInfo,
  setUserAvatar,
} = require('../controllers/users');
const { idUser, meUser, avatarUser } = require('../middlewares/joiValidation');

router.get('/users', getUsers);
router.get('/users/me', currentUser);
router.get('/users/:userId', idUser, getUser);
router.patch('/users/me', meUser, setUserInfo);
router.patch('/users/me/avatar', avatarUser, setUserAvatar);

module.exports = router;
