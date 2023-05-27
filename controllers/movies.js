const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const { CREATE_CODE } = require('../utils/constants');

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const { country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({ country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATE_CODE).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getAllMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('По данному _id информация не найдена');
      }
      if (movie.owner.toString() !== (req.user._id)) {
        throw new ForbiddenError('Доступ закрыт');
      }
      movie.deleteOne()
        .then((deletedMovie) => res.send(deletedMovie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createMovie,
  getAllMovies,
  deleteMovie,
};
