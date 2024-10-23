import { NextFunction, Request, Response } from "express"; // Importe os tipos Request e Response
import { authorModel } from "../infra/models/";

class AuthorController {
	static async getAuthors(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const allAuthors = authorModel.find();
			req.result = allAuthors;
			console.log("Próximo");
			next();
		} catch (error) {
			next(error);
		}
	}

	static async getAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = req.params.id;
			const author = await authorModel.findById(authorId);
			console.log(author);
			res.status(200).json(author);
		} catch (error) {
			next(error);
		}
	}

	static async createAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const Author = await authorModel.create(req.body);
			res.status(201).json(Author);
		} catch (error) {
			next(error);
		}
	}

	static async updateAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = req.params.id;
			const Author = await authorModel.findByIdAndUpdate(authorId, req.body);
			res.status(200).json(Author);
		} catch (error) {
			next(error);
		}
	}

	static async deleteAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const authorId = req.params.id;
			await authorModel.findByIdAndDelete(authorId);
			res.status(200).json(authorId);
		} catch (error) {
			next(error);
		}
	}
}

export default AuthorController;
