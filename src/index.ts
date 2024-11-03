// server.ts
import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./routers/userRoutes";
import pageRouter from "./routers/pageRoutes";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "../public")));

  await MongoClient.connect();

  app.use("/", pageRouter);
  app.use("/users", userRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`listening on port http://localhost:${port}/`),
  );
};

main();
