import { Request, Response } from "express";

export async function requestCardCreation(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: string} = req.body;

    // await generateCard(employeeId, type);

    res.status(201).send('ajustar com número do card e outras cositas')
}