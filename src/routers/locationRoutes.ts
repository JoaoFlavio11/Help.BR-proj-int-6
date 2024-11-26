import { Router, Request, Response } from "express";
import path from "path";
import { MongoCreateLocationRepository } from "../repositories/mongo-createLocation";
import { CreateLocationController } from "../controllers/createLocation";
import LocationData from "../models/location";

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

    console.log("Dados recebidos no formulário:", req.body);

    try {
        const result = await createLocationController.handle({
            body: req.body,
        });

        console.log("Resultado do controller:", result);
        const statusCode = result.statusCode ?? 500;

        if (statusCode === 201) {
            res.redirect("/confirmacaoDoacao");
        } else {
            res.status(statusCode).send("Erro ao cadastrar Ponto de apoio.");
        }
    } catch (error) {
        console.error("Erro no cadastro de ponto de apoio:", error);
        res.status(500).send("Erro interno do servidor.");
    }
});

// Rota para retornar os pontos de apoio em JSON
locationRouter.get("/api/support", async (req: Request, res: Response) => {
    try {
        const locations = await LocationData.find(); // Uso correto de find
        res.json(locations);
    } catch (error) {
        console.error("Erro ao buscar pontos de apoio:", error);
        res.status(500).json({ message: "Erro ao buscar pontos de apoio" });
    }
});

locationRouter.get("/map", (req: Request, res: Response) => {
    res.sendFile(
        path.join(__dirname, "../../public/html", "content", "map.html")
    );
});

export default locationRouter;
