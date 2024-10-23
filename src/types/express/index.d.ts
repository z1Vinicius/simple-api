// src/@types/express/index.d.ts
export {};

declare global {
	namespace Express {
		interface Request {
			yourProperty?: any;
		}
	}
}
