// routes/pageRoutes.ts
import { Router } from "express";
import path from "path";

const pageRouter = Router();

pageRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "html", "home.html"));
});

pageRouter.get("/cadastroDoacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "html", "cadastroDoacao.html"));
});

export default pageRouter;
