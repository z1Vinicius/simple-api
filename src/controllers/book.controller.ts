import { NextFunction, Request, Response } from "express"; // Importe os tipos Request e Response
import mongoose from "mongoose";
import authorModel from "../infra/models/author";
import bookModel from "../infra/models/book";
import { NotFoundError } from "../utils/customError";

class BookController {
	static async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
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
			next(error);
		}
	}

	static async getBook(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const bookId = req.params.id;
			const book = await bookModel.findById(bookId);
			if (!book) {
				throw new NotFoundError("Livro não encontrado");
			}
			res.status(200).json(book);
		} catch (error) {
			next(error);
		}
	}

	static async createBook(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const author = await authorModel.findById(req.body.author);
			const book = new bookModel({ ...req.body, author: author });
			await book.save();
			res.status(200).json(book);
		} catch (error) {
			next(error);
		}
	}

	static async updateBook(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const bookId = req.params.id;
			const author = await authorModel.findById(req.body.author);
			if (!bookId || author) {
				throw new mongoose.Error.ValidationError();
			}
			const book = await bookModel.findByIdAndUpdate(bookId, { ...req.body, author: author });
			res.status(200).json(book);
		} catch (error) {
			next(error);
		}
	}
	static async deleteBook(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const bookId = req.params.id;
			await bookModel.findByIdAndDelete(bookId);
			res.status(200).json(bookId);
		} catch (error) {
			next(error);
		}
	}
}

export default BookController;
