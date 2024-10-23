import { NextFunction, Request, Response } from "express";
import { PaginationError } from "../utils/customError";

async function queryPagination(req: Request, res: Response, next: NextFunction) {
	try {
		const query = req.result;
		const queryParams = (req.query.all as Record<string, any>) || {};
		let { page = 1, limit = 5, orderBy = "_id:1" } = req.query;
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

		const paginatedQuery = await query
			.find(queryParams)
			.sort({ [orderByValue]: orderType === "1" ? "asc" : "desc" })
			.skip((page - 1) * limit)
			.limit(limit);
		res.status(200).send(paginatedQuery);
	} catch (error) {}
}

export default queryPagination;
