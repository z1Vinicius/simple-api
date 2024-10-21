interface IErrorMessage {
	code: string;
	message: string;
	detailedMessage: string;
}

interface IErrorMessageResponse extends IErrorMessage {
	details?: IErrorMessage[];
}

export { IErrorMessage, IErrorMessageResponse };
