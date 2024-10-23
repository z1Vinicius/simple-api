import { NextFunction, Request, Response } from "express"; // Importe os tipos Request e Response
import { authorModel, bookModel } from "../infra/models/";
import { NotFoundError } from "../utils/customError";

class BookController {
	static async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const bookQuery = (req.query.all as Record<string, any>) || {};
			const allBooks = await bookModel.find(bookQuery).populate("author");

			res.status(200).json(allBooks);
		} catch (error) {
			next(error); // Passa o erro ao middleware de tratamento de erros
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
			if (!author) {
				throw new NotFoundError("Autor não encontrado");
			}
			const book = new bookModel({ ...req.body, author: author._id });
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
			if (!author) {
				throw new NotFoundError(`Não foi possível atualizar o livro ${bookId} pois o autor passado não existe`);
			}
			const book = await bookModel.findByIdAndUpdate(bookId, { ...req.body, author: author });
			if (!book) {
				throw new NotFoundError(`Não foi possível atualizar o livro ${bookId} pois ele não existe`);
			}
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
