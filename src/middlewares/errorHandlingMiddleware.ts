import { Request, Response, NextFunction } from "express";

function errorHandlingMiddleware(error: { type: string, message: string}, req: Request, res: Response, next: NextFunction) {

	return res.sendStatus(500);
}