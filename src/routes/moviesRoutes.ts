import express from 'express';
import MoviesController from '../controllers/moviesController';

const router = express.Router();

router
  .get('/movies/genre/:id', MoviesController.getMoviesByGenres)
  .get('/movies/videos/:id', MoviesController.getMovieVideo)
  .get('/movies/images/:id', MoviesController.getMovieImages)
  .get('/movies/top-rated', MoviesController.getTopRateds)
  .get('/movies/latest', MoviesController.getLatestMovie)
  .get('/movies/trending', MoviesController.getTrendings)
  .get('/movies/:id', MoviesController.getMovieInfo);

export default router;
