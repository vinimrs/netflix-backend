import { Request, Response } from 'express';
import moviedb from '../config/movieDBConnect';

interface ReqWithId extends Request {
  params: {
    id?: string;
  };
}

class MoviesController {
  static getMoviesByGenres = async (req: ReqWithId, res: Response) => {
    const id = req.params.id;

    try {
      const resp = await moviedb.discoverMovie({
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        with_genres: id,
        include_video: true,
      });

      res.status(200).send(resp.results);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };

  static getTrendings = async (req: Request, res: Response) => {
    try {
      const resp = await moviedb.trending({
        time_window: 'week',
        language: 'pt-BR',
        media_type: 'movie',
      });

      res.status(200).send(resp.results);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };

  static getTopRateds = async (req: Request, res: Response) => {
    try {
      const resp = await moviedb.movieTopRated({
        language: 'pt-BR',
      });

      res.status(200).send(resp.results);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };

  static getMovieInfo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const resp = await moviedb.movieInfo({
        language: 'pt-BR',
        id,
      });

      res.status(200).send(resp);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };

  static getMovieVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const resp = await moviedb.movieVideos({
        id,
        language: 'en-US',
      });

      res.status(200).send(resp.results);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };

  static getLatestMovie = async (req: Request, res: Response) => {
    try {
      const resp = await moviedb.movieLatest({
        language: 'pt-BR',
      });

      res.status(200).send(resp);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };

  static getMovieImages = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const resp = await moviedb.movieImages({
        id,
      });

      res.status(200).send(resp);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send({ error: error });
      }
    }
  };
}

export default MoviesController;
