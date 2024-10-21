import express, { Application } from "express";
import authorRoutes from "./author.routes";
import bookRoutes from "./book.routes";

const routes = (app: Application) => {
	app.use(express.json(), bookRoutes);
	app.use(express.json(), authorRoutes);
};

export default routes;
