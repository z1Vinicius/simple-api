import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { IErrorMessage } from "../types/error_handler";
import * as customError from "../utils/customError";
import { ERROR_CODES, ERROR_MESSAGES } from "../utils/customError";

enum ErrorTypes {
	MongooseCastError = "handleMongooseCastError",
	MongooseCastValidationError = "handleMongooseValidationError",
	NotFoundError = "handleCustomNotFoundError",
}

class ErrorHandler {
	public static handleError(error: Error, req: Request, res: Response, next: NextFunction) {
		if (error instanceof mongoose.Error.CastError) {
			return ErrorHandler[ErrorTypes.MongooseCastError](error, res);
		}
		if (error instanceof mongoose.Error.ValidationError) {
			return ErrorHandler[ErrorTypes.MongooseCastValidationError](error, res);
		}
		if (error instanceof customError.NotFoundError) {
			return ErrorHandler[ErrorTypes.NotFoundError](error, res);
		}
		const errorData: IErrorMessage = {
			code: ERROR_CODES.INTERNAL_ERROR,
			message: ERROR_MESSAGES.INTERNAL_ERROR,
			detailedMessage: `Invalid Data provided: ${error}`,
		};
		res.status(500).json(errorData);
		next(error);
	}

	private static handleMongooseCastError(error: mongoose.Error.CastError, res: Response) {
		const errorData: IErrorMessage = {
			code: ERROR_CODES.BAD_REQUEST,
			message: ERROR_MESSAGES.INVALID_DATA_FORMAT,
			detailedMessage: `Os dados passados são inválidos: ${error.value}`,
		};
		res.status(400).json(errorData);
	}

	private static handleMongooseValidationError(error: mongoose.Error.ValidationError, res: Response) {
		const errorMessage = Object.values(error.errors).map((error) => error.message);
		const errorData: IErrorMessage = {
			code: ERROR_CODES.VALIDATION_ERROR,
			message: ERROR_MESSAGES.INVALID_DATA_FORMAT,
			detailedMessage: `Os dados passados são inválidos: ${errorMessage}`,
			details: errorMessage,
		};
		res.status(400).json(errorData);
	}

	private static handleCustomNotFoundError(error: customError.NotFoundError, res: Response) {
		const errorData: IErrorMessage = {
			code: ERROR_CODES.NOT_FOUND,
			message: error.message || ERROR_MESSAGES.NOT_FOUND,
			detailedMessage: `Os dados passados estão faltando: ${error.message}`,
		};
		res.status(400).json(errorData);
	}

	public static pageNotFoundHandler(req: Request, res: Response, next: NextFunction) {
		const notFound: IErrorMessage = {
			code: ERROR_CODES.NOT_FOUND,
			message: ERROR_MESSAGES.NOT_FOUND,
			detailedMessage: "Não foi possível encontrar a página solicitada",
		};
		res.status(400).send(notFound);
	}
}

export default ErrorHandler;
