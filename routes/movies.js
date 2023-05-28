const moviesRouter = require('express').Router();
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/routesValidation');
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getAllMovies);

moviesRouter.post('/', createMovieValidation, createMovie);

moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
