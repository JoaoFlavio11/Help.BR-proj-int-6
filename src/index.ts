import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/getUsers";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-getUsers";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-user/mongo-createUsers";
import { CreateUserController } from "./controllers/create-user/createUser";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());

  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("hello world!");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`listening on port http://localhost:${port}/`),
  );
};

main();
