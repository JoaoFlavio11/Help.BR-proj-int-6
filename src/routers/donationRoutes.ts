import express, { Router, Request, Response } from "express";
import path from "path";
import Donation from "../models/donations";
import { CreateDonationController } from "../controllers/donation/createDonation";
import { MongoCreateDonationRepository } from "../repositories/donation/mongo-createDonation";
import { ObjectId } from "mongodb";
import { CreateDonorController } from "../controllers/createDonor";
import { MongoCreateDonorRepository } from "../repositories/mongo-createDonor";

const donationRouter = Router();

donationRouter.get("/cadastroDoacao", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "views", "cadastroDoacao.html"),
  );
});

// Rota para cadastrar uma doação
donationRouter.post("/addDonation", async (req: Request, res: Response) => {
  const mongoCreateDonationRepository = new MongoCreateDonationRepository();
  const createDonationController = new CreateDonationController(mongoCreateDonationRepository);

  const { statusCode } = await createDonationController.handle({
    body: req.body,
  });

  if (statusCode === 201) {
    // Redireciona para a página de confirmação
    res.redirect("/confirmacaoDoacao");
  } else {
    res.status(statusCode).send("Erro ao cadastrar doação.");
  }
});


// Rota para buscar a lista de doações
donationRouter.get("/doacoes", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "views", "listaDoacoes.html"),
  );
});

donationRouter.get("/confirmacaoDoacao", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "views", "confirmacaoDoacao.html"),
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

// Middleware para processar dados do formulário
donationRouter.use(express.urlencoded({ extended: true }));

// Rota para exibir os detalhes da doação
donationRouter.get("/doacoes/:id", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../public/html", "views", "detalheDoacao.html")
  );
});

// Rota POST para processar a confirmação de doação
donationRouter.post(
  "/doacoes/:id/confirmedDonation",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Controle de criação de doador
    const mongoCreateDonorRepository = new MongoCreateDonorRepository();
    const createDonorController = new CreateDonorController(mongoCreateDonorRepository);

    const { statusCode } = await createDonorController.handle({
      body: req.body,
    });

    if (statusCode === 201) {
      // Redireciona para a própria página de detalhes
      return res.redirect(`/doacoes/${id}`);
    } else {
      return res.status(statusCode).send("Erro ao confirmar a doação.");
    }
  }
);


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
