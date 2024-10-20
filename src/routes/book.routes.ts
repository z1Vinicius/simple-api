import express from "express";
import BookController from "../controllers/book.controller";

const routes = express.Router();

routes.get("/books", BookController.getBooks);
routes.get("/books/:id", BookController.getBook);
routes.post("/books", BookController.createBook);
routes.patch("/books/:id", BookController.updateBook);

export default routes;