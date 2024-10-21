import { Request, Response } from "express"; // Importe os tipos Request e Response
import authorModel from "../infra/models/author";
import bookModel from "../infra/models/book";

class BookController {
	static async getBooks(req: Request, res: Response): Promise<void> {
		try {
			const allBooks = await bookModel.find({});
			res.status(200).json(allBooks);
		} catch (error) {
			res.status(500).json({ message: `Error get all books - ${error.message}` });
		}
	}

	static async getBook(req: Request, res: Response): Promise<void> {
		try {
			const bookId = req.params.id;
			const book = await bookModel.findById(bookId);
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json({ message: `Error get book - ${error.message}` });
		}
	}

	static async createBook(req: Request, res: Response): Promise<void> {
		try {
			const author = await authorModel.findById(req.body.author);
			const book = await bookModel.create({ ...req.body, author: author });
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json({ message: `Error to create book - ${error.message}` });
		}
	}

	static async updateBook(req: Request, res: Response): Promise<void> {
		try {
			const bookId = req.params.id;
			const book = await bookModel.findByIdAndUpdate(bookId, req.body);
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json({ message: `Error to update book - ${error.message}` });
		}
	}
	static async deleteBook(req: Request, res: Response): Promise<void> {
		try {
			const bookId = req.params.id;
			const book = await bookModel.findByIdAndDelete(bookId);
			res.status(200).json(book);
		} catch (error) {
			res.status(500).json({ message: `Error to delete book - ${error.message}` });
		}
	}
}

export default BookController;
