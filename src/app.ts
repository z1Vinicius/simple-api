import express from "express";

const app = express();
const books = require("../data/books.json");

app.get("/", (req, res) => {
	res.status(200).send("Alura Curso NodeJs");
});

app.get("/books", (req, res) => {
	res.status(200).json(books);
});

app.get("");

export default app;
