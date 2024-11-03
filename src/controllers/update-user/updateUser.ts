import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<Partial<UpdateUserParams>>,
  ): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id as string; // Garantir que 'id' seja tratado como uma string
      const body = httpRequest?.body;

      // Verificação do ID do usuário
      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user ID",
        };
      }

      // Verifica se body está definido e é um objeto não vazio
      if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
        return {
          statusCode: 400,
          body: "Missing fields to update",
        };
      }

      // Definindo os campos permitidos para atualização
      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "password",
      ];
      const bodyKeys = Object.keys(body) as (keyof UpdateUserParams)[];

      // Verificando se algum campo não permitido foi recebido
      const someFieldIsNotAllowedToUpdate = bodyKeys.some(
        (key) => !allowedFieldsToUpdate.includes(key),
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Some received field is not allowed",
        };
      }

      // Forçando o TypeScript a tratar body como UpdateUserParams
      const user = await this.updateUserRepository.updateUser(
        id,
        body as UpdateUserParams,
      );

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
