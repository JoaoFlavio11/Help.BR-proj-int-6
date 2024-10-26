import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Joao",
        lastName: "Flavio",
        email: "joaoflaviocl@gmail.com",
        password: "1102",
      },
    ];
  }
}
