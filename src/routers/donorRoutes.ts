import { Router, Request, Response } from "express";
import { CreateDonorController } from "../controllers/createDonor";
import { MongoCreateDonorRepository } from "../repositories/mongo-createDonor";


const donorRouter = Router();

donorRouter.post("/doacoes/:id/confirmedDonation", async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      // Aqui, adicione a lógica para tratar os dados recebidos do formulário.
      const mongoCreateDonorRepository = new MongoCreateDonorRepository();
      const createDonorController = new CreateDonorController(mongoCreateDonorRepository);
      
      const { body, statusCode } = await createDonorController.handle({
        body: { ...req.body, donationId: id },
      });
  
      res.status(statusCode).send(body);
    } catch (error) {
      console.error("Erro ao processar confirmação de doação:", error);
      res.status(500).json({ message: "Erro interno ao confirmar doação." });
    }
  });
    

export default donorRouter;
