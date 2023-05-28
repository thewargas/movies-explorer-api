const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const { CREATE_CODE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((newUser) => {
      res.status(CREATE_CODE).send({
        name: newUser.name,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пoльзователь уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      res.send(user);
    })
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const { _id } = req.user;
  const { name, mail } = req.body;
  User.findOne({ email: mail })
    .then(() => {
      throw new ConflictError('Пoльзователь уже с таким email уже зарегистрирован');
    });
  User.findByIdAndUpdate(_id, { name, mail }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUser,
  changeUserInfo,
};
