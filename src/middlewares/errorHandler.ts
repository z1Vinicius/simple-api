import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

enum ErrorTypes {
	MongooseCastError = "handleMongooseCastError",
}

const ERROR_CODES = {
	BAD_REQUEST: "bad_request",
	INTERNAL_ERROR: "internal_error",
};

const ERROR_MESSAGES = {
	INVALID_DATA_FORMAT: "Invalid Data format",
	INTERNAL_ERROR: "Request not processed by a interval error",
};

class ErrorHandler {
	static handleError(error: Error, req: Request, res: Response, next: NextFunction) {
		if (error instanceof mongoose.Error.CastError) {
			return ErrorHandler[ErrorTypes.MongooseCastError](error, res);
		}
		const errorData = {
			code: ERROR_CODES.INTERNAL_ERROR,
			message: ERROR_MESSAGES.INTERNAL_ERROR,
			detailedMessage: `Invalid Data provided: ${error}`,
		};
		console.error(error);
		res.status(500).json(errorData);
		next(error);
	}

	private static handleMongooseCastError(error: mongoose.Error.CastError, res: Response) {
		const errorData = {
			code: ERROR_CODES.BAD_REQUEST,
			message: ERROR_MESSAGES.INVALID_DATA_FORMAT,
			detailedMessage: `Invalid Data provided: ${error.value}`,
		};
		res.status(400).json(errorData);
	}
}

export default ErrorHandler;
