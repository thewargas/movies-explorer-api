const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  changeUserInfo,
  getUser,
} = require('../controllers/users');

userRouter.get('/me', getUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), changeUserInfo);

module.exports = userRouter;
