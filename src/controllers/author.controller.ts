import { NextFunction, Request, Response } from "express"; // Importe os tipos Request e Response
import authorModel from "../infra/models/author";

class AuthorController {
	static async getAuthors(req: Request, res: Response): Promise<void> {
		try {
			const allAuthors = await authorModel.find();
			res.status(200).json(allAuthors);
		} catch (error) {
			res.status(500).json({ message: `Error get all authors - ${error.message}` });
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

	static async createAuthor(req: Request, res: Response): Promise<void> {
		try {
			const Author = await authorModel.create(req.body);
			res.status(201).json(Author);
		} catch (error) {
			res.status(500).json({ message: `Error to create Author - ${error.message}` });
		}
	}

	static async updateAuthor(req: Request, res: Response): Promise<void> {
		try {
			const authorId = req.params.id;
			const Author = await authorModel.findByIdAndUpdate(authorId, req.body);
			res.status(200).json(Author);
		} catch (error) {
			res.status(500).json({ message: `Error to update Author - ${error.message}` });
		}
	}

	static async deleteAuthor(req: Request, res: Response): Promise<void> {
		try {
			const authorId = req.params.id;
			const Author = await authorModel.findByIdAndDelete(authorId);
			res.status(200).json(Author);
		} catch (error) {
			res.status(500).json({ message: `Error to delete Author - ${error.message}` });
		}
	}
}

export default AuthorController;
