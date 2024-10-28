import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/getUsers";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-getUsers";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();

  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("hello world!");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`listening on por http://localhost:${port}/`),
  );
};

main();
