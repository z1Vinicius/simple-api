import express from "express";
import AuthorController from "../controllers/author.controller";
import queryPagination from "../middlewares/queryPagination";
const routes = express.Router();

routes.get("/author", AuthorController.getAuthors, queryPagination);
routes.get("/author/:id", AuthorController.getAuthor);
routes.post("/author", AuthorController.createAuthor);
routes.put("/author/:id", AuthorController.updateAuthor);
routes.delete("/author/:id", AuthorController.deleteAuthor);

export default routes;
