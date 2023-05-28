const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movies');
const { urlRegExp } = require('../utils/constants');

moviesRouter.get('/', getAllMovies);

moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegExp),
    trailerLink: Joi.string().required().regex(urlRegExp),
    thumbnail: Joi.string().required().regex(urlRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

moviesRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = moviesRouter;
