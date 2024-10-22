import express from "express";
import BookController from "../controllers/book.controller";
const routes = express.Router();

routes.get("/book", BookController.getBooks);
routes.post("/book", BookController.createBook);
routes.put("/book/:id", BookController.updateBook);
routes.delete("/book/:id", BookController.deleteBook);

export default routes;
