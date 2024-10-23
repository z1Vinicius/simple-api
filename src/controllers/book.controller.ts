import { NextFunction, Request, Response } from "express"; // Importe os tipos Request e Response
import { authorModel, bookModel } from "../infra/models/";
import { NotFoundError, PaginationError } from "../utils/customError";

class BookController {
	static async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const bookQuery = (req.query.all as Record<string, any>) || {};
			let { page = 1, limit = 5, orderBy = "_id:asc" } = req.query;
			page = Number(page);
			limit = Number(limit);

			if (page <= 0 || limit <= 0 || limit >= 200) {
				throw new PaginationError("Os parâmetros de paginação são inválidos");
			}

			let [orderByValue, orderType] = new String(orderBy).split(":");
			const validOrderFields = ["_id", "title", "publishedDate"];
			if (!validOrderFields.includes(orderByValue as string)) {
				orderByValue = "_id";
			}

			const allBooks = await bookModel
				.find(bookQuery)
				.sort({ [orderByValue]: orderType === "1" ? "asc" : "desc" })
				.skip((page - 1) * limit)
				.limit(limit)
				.populate("author");

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
