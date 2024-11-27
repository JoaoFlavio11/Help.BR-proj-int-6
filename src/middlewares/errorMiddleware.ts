/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";

// Middleware para tratamento de erros globais
export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const statusCode = res.statusCode !== 200? res.statusCode : 500;

    // Log de depuração detalhado
    console.error(`[${new Date().toISOString()}] [${req.method}] ${req.url}`);
    console.error("Erro:",err.message);
    if(err.stack){
        console.error("Stack trace:", err.stack);
    }

    // Exibido ao cliente:
    res.status(statusCode).json({
        message: err.message || "Erro interno no servidor. Estamos trabalhando nisso.",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};
