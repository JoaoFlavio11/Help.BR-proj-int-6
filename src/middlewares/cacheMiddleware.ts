/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { redisClient } from "../database/redisClient";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.originalUrl;

    // Tenta buscar no cache
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      // Envia os dados do cache e interrompe o fluxo
      res.status(200).json(JSON.parse(cachedData));
      return;
    }

    // Substitui a função `res.json` para armazenar os dados no cache
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      redisClient.setEx(key, 3600, JSON.stringify(body)); // Cache por 1 hora
      return originalJson(body); // Continua o fluxo original
    };

    next(); // Continua para o próximo middleware ou rota
  } catch (error) {
    console.error("Erro no middleware de cache:", error);
    next(error); // Encaminha o erro ao middleware global de tratamento
  }
};
