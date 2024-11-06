import { Router, Request, Response } from "express";
import path from "path";
import Donation from "../models/donations";
import { CreateDonationController } from "../controllers/donation/createDonation";
import { MongoCreateDonationRepository } from "../repositories/donation/mongo-createDonation";
import { ObjectId } from "mongodb";

const donationRouter = Router();

donationRouter.get("/cadastroDoacao", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public", "html", "cadastroDoacao.html"),
  );
});

// Rota para cadastrar uma doação
donationRouter.post("/addDonation", async (req: Request, res: Response) => {
  const mongoCreateDonationRepository = new MongoCreateDonationRepository();
  const createDonationController = new CreateDonationController(
    mongoCreateDonationRepository,
  );

  const { body, statusCode } = await createDonationController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

// Rota para buscar a lista de doações
donationRouter.get("/doacoes", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public", "html", "listaDoacoes.html"),
  );
});

// Rota para buscar as doações como JSON
donationRouter.get("/api/doacoes", async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch {
    res.status(500).json({ message: "Erro ao buscar doações" });
  }
});

// Rota para exibir a página de detalhes da doação
donationRouter.get("/doacoes/:id", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public", "html", "detalheDoacao.html"),
  );
});

// Rota para buscar uma doação específica como JSON
donationRouter.get("/api/doacoes/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const donation = await Donation.findById(new ObjectId(id));
    if (!donation) {
      res.status(404).json({ message: "Doação não encontrada" });
      return;
    }

    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar doação" });
  }
});

export default donationRouter;
