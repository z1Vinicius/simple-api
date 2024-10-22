import { NextFunction, Request, Response } from "express";

export function requireParamId(req: Request, res: Response, next: NextFunction) {
	const idParam = req.params.id;
	const idQueryParam = req.query.id;
	if (!idParam || idQueryParam) {
		const errorData = {
			code: "missing_parameters",
			message: "Missing id in parameter",
			detailedMessage: "Missing id in url parameter request",
		};
		res.status(400).json(errorData);
		return;
	}
	next();
}
