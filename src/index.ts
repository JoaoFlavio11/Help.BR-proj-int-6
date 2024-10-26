import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/getUsers";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-getUsers";

config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();

  const getUsersController = new GetUsersController(mongoGetUsersRepository);

  const { body, statusCode } = await getUsersController.handle();

  res.send(body).status(statusCode);
});

app.listen(port, () =>
  console.log(`listening on por http://localhost:${port}/`),
);
//min 30:29