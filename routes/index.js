const router = require('express').Router();
const usersRouter = require('./users');
const {
  loginValidation,
  registerValidation,
} = require('../middlewares/routesValidation');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin', loginValidation, login);

router.post('/signup', registerValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Неправильный адрес'));
});

module.exports = router;
