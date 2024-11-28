import { Request, Response, NextFunction } from "express";

export const cookieMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("Cookies recebidos:", req.cookies);
    next();
  };