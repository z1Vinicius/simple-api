import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.status(200).send("Alura Curso NodeJs");
});

app.get("");

export default app;
