export const ERROR_CODES = {
	BAD_REQUEST: "bad_request",
	INTERNAL_ERROR: "internal_error",
	VALIDATION_ERROR: "invalid_data",
	NOT_FOUND: "not_found",
};

export const ERROR_MESSAGES = {
	INVALID_DATA_FORMAT: "Formato de dados inválidos",
	INTERNAL_ERROR: "A requisição não foi processada devido a um erro interno do servidor",
	NOT_FOUND: "A rota solicitada não foi encontrada",
};

export class NotFoundError extends Error {
	constructor(message: string = "Item não encontrado") {
		super();
		this.message = message;
		this.name = ERROR_CODES.NOT_FOUND;
	}
}

export class MissingParamsError extends Error {
	constructor(parameter: string) {
		super();
		this.message = `Parâmetro ${parameter} faltando`.trim();
		this.name = ERROR_CODES.NOT_FOUND;
	}
}

export class PaginationError extends Error {
	constructor(message: string = "Os parâmetros passados para a paginação são inválidos") {
		super();
		this.message = message;
		this.name = ERROR_CODES.NOT_FOUND;
	}
}
