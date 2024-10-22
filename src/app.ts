import express from "express";
import connection from "./infra/db/settings/base";
import ErrorHandler from "./middlewares/errorHandler";
import routes from "./routes";

connection;
const app = express();
// app.use((req, res, next) => {
// 	console.log("Nova requisição");
// 	next();
// });
routes(app);
app.use(ErrorHandler.handleError);

export default app;
