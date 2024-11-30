import { Request, Response } from "express";
import path from "path";

export const routeNotFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).sendFile(path.join(__dirname, "../../public/html/content/404.html"));
};  