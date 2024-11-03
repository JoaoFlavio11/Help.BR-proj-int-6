import { Router } from "express";
import path from "path";
import Donation from "../models/donations";
import { CreateDonationController } from "../controllers/donation/createDonation";
import { MongoCreateDonationRepository } from "../repositories/donation/mongo-createDonation";

const donationRouter = Router();

donationRouter.get("/cadastroDoacao", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../public", "html", "cadastroDoacao.html"),
  );
});

// Rota para cadastrar uma doação
donationRouter.post("/addDonation", async (req, res) => {
  const mongoCreateDonationRepository = new MongoCreateDonationRepository();
  const createDonationController = new CreateDonationController(
    mongoCreateDonationRepository,
  );

  const { body, statusCode } = await createDonationController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

// Rota para buscar as doações cadastradas
donationRouter.get("/doacoes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public", "html", "listaDoacoes.html"));
});

// Rota para buscar as doações como JSON (para uso em JavaScript)
donationRouter.get("/api/doacoes", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch {
    res.status(500).json({ message: "Erro ao buscar doações" });
  }
});



export default donationRouter;
