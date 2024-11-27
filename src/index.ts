import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./routers/userRoutes";
import pageRouter from "./routers/pageRoutes";
import donationRouter from "./routers/donationRoutes";
import authRouter from "./routers/authRoutes";
import colabRouter from "./routers/colabRoutes";
import locationRouter from "./routers/locationRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { rateLimitMiddleware } from "./middlewares/rateLimitMiddleware";
import { connectToMongoose } from "./database/mongoose";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  
  app.use(express.urlencoded({ extended: true })); //processar dados do formulário
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(rateLimitMiddleware); // middleware de rate limiting

  await connectToMongoose(); // Conecta-se ao MongoDB com mongoose

  app.use("/", pageRouter);
  app.use("/users", userRouter);
  app.use("/", donationRouter);
  app.use("/", authRouter);
  app.use("/colab", colabRouter);
  app.use("/location", locationRouter);

  //middleware para erros globais
  app.use(errorMiddleware);

  

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on http://localhost:${port}/login`));
};

main().catch((error) => {
  console.error("Erro ao iniciar o servidor:", error);
});


