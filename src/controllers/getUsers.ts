import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController{
    getUsersRepository: IGetUsersRepository;

    constructor(getUsersRepository: IGetUsersRepository){
        this.getUsersRepository = getUsersRepository
    }

    //min 19:16
    
    handle(){
        //validar a requisicao
        //direciona o chamado para o repository
    }
}