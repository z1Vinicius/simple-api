interface IErrorMessage {
	code: string;
	message: string;
	detailedMessage: string;
	details?: string[];
}

export { IErrorMessage };
