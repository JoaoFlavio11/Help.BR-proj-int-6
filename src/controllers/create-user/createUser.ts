import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";
import validator from 'validator';

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async createUser(params: CreateUserParams): Promise<User> {
    return await this.createUserRepository.createUser(params);
  }

  async handle(
    httpRequest: HttpRequest<Partial<CreateUserParams>>,
  ): Promise<HttpResponse<User>> {
    try {
      // Verificar campos obrigatórios
      const requiredFields: (keyof CreateUserParams)[] = ["firstName", "lastName", "email", "password"];
      
      for (const field of requiredFields) {
        if (!httpRequest.body || !httpRequest.body[field]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      // Desestruturar os campos assegurados
      const { firstName, lastName, email, password } = httpRequest.body as CreateUserParams;

      // Verificar se o email é válido
      if (!validator.isEmail(email)) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }

      // Chamar o método de criação de usuário com os campos assegurados
      const user = await this.createUser({
        firstName,
        lastName,
        email,
        password,
      });

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Sth went wrong.",
      };
    }
  }
}
