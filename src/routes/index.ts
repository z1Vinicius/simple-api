import express, { Application } from 'express';
import bookRoutes from './book.routes'

const routes = (app: Application) => {
  app.use(express.json(), bookRoutes);
}

export default routes;