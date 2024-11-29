import { redisClient } from "../database/redisClient";
import { Request, Response, NextFunction } from "express";

export const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl;

  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData)); // Retorna cache se existir
    }

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      redisClient.setEx(key, 3600, JSON.stringify(body)); // Cache por 1 hora
      return originalJson(body); // Continua o fluxo normal
    };

    next();
  } catch (error) {
    console.error("Erro no middleware de cache:", error);
    next(); // Prossegue sem cache em caso de erro
  }
};