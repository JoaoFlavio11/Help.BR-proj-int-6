import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async createUser(params: CreateUserParams): Promise<User> {
    return await this.createUserRepository.createUser(params);
  }

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
        //verificar campos obrigatórios
        const requiredFields = ['firstName', 'lastname', 'email', 'password'];
        
        for(const field of requiredFields){
            if(!httpRequest?.body?.[field as keyof CreateUserParams]?.length){
                r    statusCode: 400,
                    body: "Please specify a body",
                  };
            }
        }
        //1:14:05

      const user = await this.createUser(httpRequest.body);
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
