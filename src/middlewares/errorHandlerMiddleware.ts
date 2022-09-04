import { Request, Response, NextFunction } from "express";

export default async function errorHandlerMiddleware(error: { type: string, message: string}, req: Request, res: Response, next: NextFunction) {
	if(error.type === "unauthorized") {
		return res.status(401).send(error.message);
	}

	if(error.type === "schema") {
		return res.status(422).send(error.message);
	}

	if(error.type === "not found") {
		return res.status(404).send(error.message);
	}

	if(error.type === "registred") {
		return res.status(409).send(error.message);
	}

	if(error.type === "denied") {
		return res.status(403).send(error.message);
	}

	return res.sendStatus(500);
}