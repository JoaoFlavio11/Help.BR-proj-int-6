// controllers/createDonor.ts
import { MongoCreateDonorRepository } from "../repositories/mongo-createDonor";

interface DonorBody {
    donorCpf: string;
    donorEmail: string;
    donorName: string;
    donorLocation: string;
}

export class CreateDonorController {
    constructor(private createDonorRepository: MongoCreateDonorRepository) {}

    async handle({ body }: { body: DonorBody }) {
        // Validação de dados
        const { donorCpf, donorEmail, donorName, donorLocation } = body;
        if (!donorCpf || !donorEmail || !donorName || !donorLocation) {
            console.error("Dados incompletos no corpo da requisição", body);
            return { body: "Dados incompletos no corpo da requisição", statusCode: 400 };
        }

        try {
            const donation = await this.createDonorRepository.createDonor(body);
            return { body: donation, statusCode: 201 };
        } catch (error) {
            console.error("Erro ao cadastrar dados de doador:", error);
            return { body: "Erro ao cadastrar dados de doador", statusCode: 500 };
        }
    }
}
