// index.ts
import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./routers/userRoutes";
import pageRouter from "./routers/pageRoutes";
import donationRouter from "./routers/donationRoutes";
import authRouter from "./routers/authRouter";
import { connectToMongoose } from "./database/mongoose";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); //processar dados do formulário
  app.use(express.static(path.join(__dirname, "../public")));

  await connectToMongoose(); // Conecta-se ao MongoDB com mongoose
  await MongoClient.connect(); // Conecta-se ao MongoDB com MongoClient

  app.use("/", pageRouter);
  app.use("/users", userRouter);
  app.use("/", donationRouter);
  app.use("/", authRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
};

main();
