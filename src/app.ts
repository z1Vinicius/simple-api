import express from "express";
import connection from "./infra/db/settings/base";
import routes from "./routes";

connection
const app = express();
app.use(express.json())
routes(app)

export default app;
