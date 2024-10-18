import express from "express";

const app = express();
app.use(express.json())

interface IBook{
	id: number
	title: string
}

const books: IBook[] = require("../data/books.json");
app.get("/", (req, res) => {
	res.status(200).send("Alura Curso NodeJs");
});

app.get("/books", (req, res) => {
	res.status(200).json(books);
});

app.post("/books", (req, res) => {
	const id = Math.max.apply(Math, books.map(function(o) { return o.id; }))
	const newBook: IBook = {id: id + 1, title: req.body.title}
	books.push(newBook)
	res.status(201).json(newBook)

})

app.get("");

export default app;
