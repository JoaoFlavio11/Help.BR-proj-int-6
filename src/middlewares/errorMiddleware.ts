/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// Middleware para tratamento de erros globais
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Log detalhado usando Winston
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Exibição de resposta ao cliente
  res.status(statusCode).json({
    message:
      err.message || "Erro interno no servidor. Estamos trabalhando nisso.",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Mostra stack apenas em ambientes de desenvolvimento
  });
};
