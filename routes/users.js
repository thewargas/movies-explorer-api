const userRouter = require('express').Router();
const {
  changeUserInfoValidation,
} = require('../middlewares/routesValidation');
const {
  changeUserInfo,
  getUser,
} = require('../controllers/users');

userRouter.get('/me', getUser);

userRouter.patch('/me', changeUserInfoValidation, changeUserInfo);

module.exports = userRouter;
