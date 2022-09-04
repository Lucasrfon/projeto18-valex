import { Request, Response, NextFunction } from "express";

export default async function errorHandlerMiddleware(error: { type: string, message: string}, req: Request, res: Response, next: NextFunction) {
	if(error.type === "unauthorized") {
		return res.status(401).send(error.message);
	}

	if(error.type === "schema") {
		return res.status(422).send(error.message);
	}

	if(error.type === "employee id") {
		return res.status(422).send(error.message);
	}

	if(error.type === "registred") {
		return res.status(422).send(error.message);
	}

	return res.sendStatus(500);
}