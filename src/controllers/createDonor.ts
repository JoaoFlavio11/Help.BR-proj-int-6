import { MongoCreateDonorRepository } from "../repositories/mongo-createDonor";

interface DonorBody{
    donorCpf: string;
    donorEmail: string;
    donorName: string;
    donorLocation:string;
}

export class CreateDonorController{
    constructor(
        private createDonorRepository: MongoCreateDonorRepository,
    ){}

    async handle({body}: {body: DonorBody}){
        try{
            const donation = await this.createDonorRepository.createDonor({
                donorCpf: body.donorCpf,
                donorEmail: body.donorEmail,
                donorName: body.donorName,
                donorLocation: body.donorLocation,
            });
            return { body: donation, statusCode: 201};
        } catch {
            return {body:"Erro ao cadastrar dados de doador", statusCode:500};
        }
    }
}