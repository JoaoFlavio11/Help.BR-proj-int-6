// locationRoutes.ts
import { Router, Request, Response } from "express";
import path from "path";
import { MongoCreateLocationRepository } from "../repositories/mongo-createLocation";
import { CreateLocationController } from "../controllers/createLocation";

const locationRouter = Router();

locationRouter.get("/support", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, "../../public/html", "content", "locais.html")
    );
});

locationRouter.get("/create", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, "../../public/html", "views", "cadastroLocal.html")
    );
});

locationRouter.post("/create", async (req: Request, res: Response) => {
    const mongoCreateLocationRepository = new MongoCreateLocationRepository();
    const createLocationController = new CreateLocationController(mongoCreateLocationRepository);

    console.log("Dados recebidos no formulário:", req.body); // Log para verificar os dados

    try {
        const result = await createLocationController.handle({
            body: req.body,
        });

        console.log("Resultado do controller:", result); // Log para verificar o retorno do controller
        const statusCode = result.statusCode ?? 500;

        if (statusCode === 201) {
        res.redirect("/confirmacaoDoacao");
        } else {
        res.status(statusCode).send("Erro ao cadastrar Ponto de acesso.");
        }
    } catch (error) {
        console.error("Erro no cadastro de ponto de acesso:", error);
        res.status(500).send("Erro interno do servidor.");
    }
});

export default locationRouter;