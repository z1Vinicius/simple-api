import express from "express";
import connection from "./infra/db/settings/base";
import ErrorHandler from "./middlewares/errorHandler";
import routes from "./routes";

connection;
const app = express();
routes(app);
app.use(ErrorHandler.handleError);
app.use(ErrorHandler.pageNotFoundHandler);

export default app;
