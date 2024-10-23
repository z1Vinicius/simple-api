import express from "express";
import BookController from "../controllers/book.controller";
import getBookParams from "../middlewares/bookExtractor";
import queryPagination from "../middlewares/queryPagination";
const routes = express.Router();

routes.get("/book", getBookParams, BookController.getBooks, queryPagination);
routes.post("/book", BookController.createBook);
routes.put("/book/:id", BookController.updateBook);
routes.delete("/book/:id", BookController.deleteBook);

export default routes;
