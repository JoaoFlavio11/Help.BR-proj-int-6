import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { ICreateUserController } from "./protocols";

export class CreateUserControll implements ICreateUserController{
    constructor(private readonly createUserRepository: ICreateUserController)

    async handle(httpRequest: HttpRequest): Promise<HttpResponse<User>> {
        try{
            const {body} = httpRequest
            
            const user = await this.createUserRepository.createUser(body)ç

        } catch (error) {
            console.error(error);
            return {}
        }
    }

}