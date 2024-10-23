// src/@types/express/index.d.ts
export {};

declare global {
	namespace Express {
		interface Request {
			result?: any; // Altere 'any' para o tipo adequado se necessário
		}
	}
}
