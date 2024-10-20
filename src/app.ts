import express from "express";
import connection from "./infra/db/settings/base";
import bookModel from "./infra/models/book";

const app = express();
app.use(express.json())


// const books: IBook[] = require("../data/books.json");
app.get("/", (req, res) => {
	res.status(200).send("Alura Curso NodeJs");
});

app.get("/books", async (req, res) => {
	const books = await bookModel.find({});
	res.status(200).json(books);
});

// app.post("/books", (req, res) => {
// 	const id = Math.max.apply(Math, books.map(function(o) { return o.id; }))
// 	const newBook: IBook = {id: id + 1, title: req.body.title}
// 	books.push(newBook)
// 	res.status(201).json(newBook)
// })

// app.patch("/books/:id", (req, res) => {
//   try {
//     const bookData: IBook = req.body;
// 		const bookId = req.params.id

//     const bookIndex = books.findIndex((book) => book.id === Number(bookId));
//     if (bookIndex === -1) {
//       res.status(404).json({ message: "Livro não encontrado" });
// 			return
//     }
//     books[bookIndex] = { ...books[bookIndex], title: bookData.title };

//     res.status(200).json(books[bookIndex]);
//   } catch (error) {
//     res.status(500).json({ message: "Erro interno do servidor", error });
//   }
// });

// app.delete("/books/:id", (req, res)=> {
// 	const bookId = req.params.id
// 	const bookIndex = books.findIndex((book) => book.id === Number(bookId));
// 	if (bookIndex === -1) {
// 		res.status(404).json({ message: "Livro não encontrado" });
// 		return
// 	}
// 	books.splice(bookIndex, 1)
// 	res.status(200).send(`Livro ${bookId} deletado`)
// })

// app.get("");

export default app;
