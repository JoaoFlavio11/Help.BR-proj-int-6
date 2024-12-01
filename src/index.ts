import express from "express";
import { config } from "dotenv";
import path from "path";
import compression from "compression";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./utils/swaggerConfig";
import userRouter from "./routers/userRoutes";
import pageRouter from "./routers/pageRoutes";
import donationRouter from "./routers/donationRoutes";
import authRouter from "./routers/authRoutes";
import colabRouter from "./routers/colabRoutes";
import locationRouter from "./routers/locationRoutes";
import { connectToMongoose } from "./database/mongoose";
import { connectToRedis } from "./database/redisClient";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rateLimitMiddleware } from "./middlewares/rateLimitMiddleware";
import { cookieMiddleware } from "./middlewares/cookieMiddleware";
import { routeNotFoundMiddleware } from "./middlewares/routeNotFoundMiddleware";

// Carregar variáveis de ambiente
config();

// Inicializa o app Express
const app = express();

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Processar dados do formulário
app.use(compression()); // Compressão de respostas
app.use(cookieParser()); // Habilitação de cookies
app.use(express.static(path.join(__dirname, "../public")));
app.use(rateLimitMiddleware); // Middleware de rate limiting

// Conexões com banco de dados
(async () => {
  try {
    await connectToMongoose(); // MongoDB com Mongoose
    await connectToRedis(); // Redis
  } catch (error) {
    console.error("Erro ao conectar aos bancos de dados:", error);
  }
})();

setupSwagger(app);

// Rotas
app.use("/", pageRouter);
app.use("/users", userRouter);
app.use("/", donationRouter);
app.use("/", authRouter);
app.use("/colab", colabRouter);
app.use("/location", locationRouter);

// Middlewares finais
app.use(cookieMiddleware); // Middleware de cookies
app.use(routeNotFoundMiddleware); // Middleware de rotas não encontradas
app.use(errorMiddleware); // Middleware para erros globais

// Porta e servidor
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}/login`),
);


// Exporta o app para testes
export { app };
