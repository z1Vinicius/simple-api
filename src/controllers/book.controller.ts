import { Request, Response } from "express"; // Importe os tipos Request e Response
import mongoose from "mongoose";
import authorModel from "../infra/models/author";
import bookModel from "../infra/models/book";
import { sendErrorResponse } from "../utils/error_handler";

class BookController {
	static async getBooks(req: Request, res: Response): Promise<void> {
		try {
			const id = req.query.id;
			let allBooks = {};
			if (id) {
				allBooks = await bookModel.find({ _id: id });
			} else {
				allBooks = await bookModel.find({});
			}
			res.status(200).json(allBooks);
		} catch (error) {
			res.status(500).json({ message: `Error get all books - ${error.message}` });
		}
	}

	static async getBook(req: Request, res: Response): Promise<void> {
		try {
			const bookId = req.params.id;
			const book = await bookModel.findById(bookId);
			if (!book) {
				const bookError = { code: "not_found", message: "Book not found", detailedMessage: `Not able to find a book with id: ${bookId}` };
				sendErrorResponse(res, bookError, 404);
			}
			res.status(200).json(book);
		} catch (error) {
			if (error instanceof mongoose.Error.CastError) {
				const bookError = { code: "bad_request", message: "Bad Request", detailedMessage: `Error to get book by a bad request: ${error}` };
				sendErrorResponse(res, bookError, 400);
			}
			const bookError = { code: `internal_error`, message: "Interval Server Error", detailedMessage: `Error to get book by server error: ${error}` };
			sendErrorResponse(res, bookError, 500);
		}
	}

	static async createBook(req: Request, res: Response): Promise<void> {
		try {
			const author = await authorModel.findById(req.body.author);
			const book = new bookModel({ ...req.body, author: author });
			await book.save();
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
