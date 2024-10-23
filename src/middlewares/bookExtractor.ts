import { NextFunction, Request, Response } from "express";
import { authorModel } from "../infra/models";

async function getBookParams(req: Request, res: Response, next: NextFunction) {
	try {
		const { id, minPages, maxPages, price, publisher, title, author } = req.query;
		const filterBookQuery: Record<string, any> = {};

		if (id) filterBookQuery._id = id;

		if (minPages || maxPages) {
			filterBookQuery.pages = {};
			if (minPages && !isNaN(Number(minPages))) {
				filterBookQuery.pages.$gte = Number(minPages);
			}
			if (maxPages && !isNaN(Number(maxPages))) {
				filterBookQuery.pages.$lte = Number(maxPages);
			}
		}

		if (price && !isNaN(Number(price))) {
			filterBookQuery.price = Number(price);
		}

		if (publisher) {
			const regex = new RegExp(publisher as string, "i");
			filterBookQuery.publisher = regex;
		}

		if (title) {
			filterBookQuery.title = { $regex: title as string, $options: "i" };
		}

		if (author) {
			const findAuthor = await authorModel.findOne({ name: author as string });
			if (findAuthor) {
				filterBookQuery.author = findAuthor._id;
			} else {
				filterBookQuery.author = null;
			}
		}

		req.query.all = filterBookQuery;
		next();
	} catch (error) {
		next(error);
	}
}

export default getBookParams;
