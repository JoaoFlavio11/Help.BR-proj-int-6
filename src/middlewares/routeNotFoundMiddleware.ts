import { Request, Response } from "express";

export const routeNotFoundMiddleware = (req: Request, res: Response) => {
    res.status(404).json({message: "Rota não encontrada"});
};