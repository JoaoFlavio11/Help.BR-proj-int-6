// routes/pageRoutes.ts
import { Router } from "express";
import path from "path";
import { cacheMiddleware } from "../middlewares/cacheMiddleware";

const pageRouter = Router();

pageRouter.get("/", cacheMiddleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "content", "home.html"),
  );
});

pageRouter.get("/parceiros", cacheMiddleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "content", "parceiros.html"),
  );
});

pageRouter.get("/profile", cacheMiddleware, (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "content", "profile.html"),
  );
});

export default pageRouter;
