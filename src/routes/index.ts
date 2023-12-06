import express, { Application } from 'express';

import imageRoutes from './imageRoutes';
import profileRoutes from './profileRoutes';
import userRoutes from './userRoutes';
import moviesRoutes from './moviesRoutes';

const routes = (app: Application) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'Backend Netflix-Clone' });
  });

  app.use(express.json(), imageRoutes, profileRoutes, userRoutes, moviesRoutes);
};

export default routes;
