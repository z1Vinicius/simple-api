import { NextFunction, Request, Response } from "express"; // Importe os tipos Request e Response
import { authorModel, bookModel } from "../infra/models/";
import { NotFoundError } from "../utils/customError";

class BookController {
	static async getBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id, pages, price, publisher, title } = req.query;

			const regex = new RegExp(publisher as string, "i");
			const filterQuery: any = {};
			if (id) filterQuery._id = id;
			if (pages) filterQuery.pages = { $gte: pages };
			if (price) filterQuery.price = price;
			if (publisher) filterQuery.publisher = regex;
			if (title) filterQuery.title = { $regex: title, $options: "i" };

			let allBooks = {};
			if (req.query) {
				allBooks = await bookModel.find(filterQuery);
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
