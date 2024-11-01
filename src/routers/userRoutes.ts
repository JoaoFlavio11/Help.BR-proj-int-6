// routes/userRoutes.ts
import { Router } from "express";
import { GetUsersController } from "../controllers/get-users/getUsers";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-getUsers";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-createUsers";
import { CreateUserController } from "../controllers/create-user/createUser";
import { MongoUpdateUserRepository } from "../repositories/update-user/mongoUpdateUser";
import { UpdateUserController } from "../controllers/update-user/updateUser";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);
  const { body, statusCode } = await getUsersController.handle();

  res.status(statusCode).send(body);
});

userRouter.post("/", async (req, res) => {
  const mongoCreateUserRepository = new MongoCreateUserRepository();
  const createUserController = new CreateUserController(mongoCreateUserRepository);
  const { body, statusCode } = await createUserController.handle({ body: req.body });

  res.status(statusCode).send(body);
});

userRouter.patch("/:id", async (req, res) => {
  const mongoUpdateUserRepository = new MongoUpdateUserRepository();
  const updateUserController = new UpdateUserController(mongoUpdateUserRepository);
  const { body, statusCode } = await updateUserController.handle({ body: req.body, params: req.params });
  
  res.status(statusCode).send(body);
});

export default userRouter;
