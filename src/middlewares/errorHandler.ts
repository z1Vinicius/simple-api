import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

enum ErrorTypes {
	MongooseCastError = "handleMongooseCastError",
	MongooseCastValidationError = "handleMongooseValidationError",
}

const ERROR_CODES = {
	BAD_REQUEST: "bad_request",
	INTERNAL_ERROR: "internal_error",
	VALIDATION_ERROR: "invalid_data",
};

const ERROR_MESSAGES = {
	INVALID_DATA_FORMAT: "Formato de dados inválidos",
	INTERNAL_ERROR: "A requisição não foi processada devido a um erro interno do servidor",
};

class ErrorHandler {
	static handleError(error: Error, req: Request, res: Response, next: NextFunction) {
		console.log(error.name);
		if (error instanceof mongoose.Error.CastError) {
			return ErrorHandler[ErrorTypes.MongooseCastError](error, res);
		}
		if (error instanceof mongoose.Error.ValidationError) {
			return ErrorHandler[ErrorTypes.MongooseCastValidationError](error, res);
		}
		const errorData = {
			code: ERROR_CODES.INTERNAL_ERROR,
			message: ERROR_MESSAGES.INTERNAL_ERROR,
			detailedMessage: `Invalid Data provided: ${error}`,
		};
		res.status(500).json(errorData);
		next(error);
	}

	private static handleMongooseCastError(error: mongoose.Error.CastError, res: Response) {
		const errorData = {
			code: ERROR_CODES.BAD_REQUEST,
			message: ERROR_MESSAGES.INVALID_DATA_FORMAT,
			detailedMessage: `Os dados passados são inválidos: ${error.value}`,
		};
		res.status(400).json(errorData);
	}

	private static handleMongooseValidationError(error: mongoose.Error.ValidationError, res: Response) {
		const errorMessage = Object.values(error.errors).map((error) => error.message);
		const errorData = {
			code: ERROR_CODES.VALIDATION_ERROR,
			message: ERROR_MESSAGES.INVALID_DATA_FORMAT,
			detailedMessage: `Os dados passados são inválidos: ${errorMessage}`,
			details: errorMessage,
		};
		res.status(400).json(errorData);
	}
}

export default ErrorHandler;
