import { Response } from "express";
import { IErrorMessageResponse } from "../types/error_handler";

function sendErrorResponse(res: Response, errorData: IErrorMessageResponse, statusCode: number): Response {
	return res.status(statusCode).send(errorData);
}

export { sendErrorResponse };
