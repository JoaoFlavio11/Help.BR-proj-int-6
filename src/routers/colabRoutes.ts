// colabRoutes.ts
import { Router, Request, Response } from "express";
import path from "path";
import { MongoCreatePartnerRepository } from "../repositories/mongo-createPartner";
import { CreatePartnerController } from "../controllers/createPartner";
import { MongoCreateSponsorRepository } from "../repositories/mongo-createSponsor";
import { CreateSponsorController } from "../controllers/createSponsor";

const colabRouter = Router();

colabRouter.get("/partner", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "views", "cadastroPartner.html")
  );
});

colabRouter.post("/partner", async (req: Request, res: Response) => {
  const mongoCreatePartnerRepository = new MongoCreatePartnerRepository();
  const createPartnerController = new CreatePartnerController(
    mongoCreatePartnerRepository
  );

  console.log("Dados recebidos no formulário:", req.body); // Log para verificar os dados

  try {
    const result = await createPartnerController.handle({
      body: req.body,
    });

    console.log("Resultado do controller:", result); // Log para verificar o retorno do controller

    const statusCode = result.statusCode ?? 500;

    if (statusCode === 201) {
      res.redirect("/confirmacaoDoacao");
    } else {
      res.status(statusCode).send("Erro ao cadastrar Parceiro.");
    }
  } catch (error) {
    console.error("Erro no cadastro de parceiro:", error);
    res.status(500).send("Erro interno do servidor.");
  }
});

colabRouter.get("/sponsor", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "views", "cadastroSponsor.html")
  );
});

colabRouter.post("/sponsor", async (req: Request, res: Response) => {
  console.log("Dados recebidos no formulário:", req.body);
  const mongoCreateSponsorRepository = new MongoCreateSponsorRepository();
  const createSponsorController = new CreateSponsorController(mongoCreateSponsorRepository);

  console.log("Dados recebidos no formulário:", req.body); // Log para verificar os dados

  try{
    const result = await createSponsorController.handle({
      body: req.body,
    });

    console.log("Resultado do controller:", result); // Log para verificar o retorno do controller

    const statusCode = result.statusCode ?? 500;

    if (statusCode === 201) {
      res.redirect("/confirmacaoDoacao");
    } else {
      res.status(statusCode).send("Erro ao cadastrar Patrocinador.");
    }
  } catch (error) {
    console.error("Erro no cadastro de Patrocinador:", error);
    res.status(500).send("Erro interno do servidor.");
  }
});

export default colabRouter;
