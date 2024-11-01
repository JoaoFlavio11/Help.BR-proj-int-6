// routes/pageRoutes.ts
import { Router } from "express";
import path from "path";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend", "html", "home.html"));
});

pageRouter.get("/doar", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend", "html", "doar.html"));
});

export default pageRouter;
