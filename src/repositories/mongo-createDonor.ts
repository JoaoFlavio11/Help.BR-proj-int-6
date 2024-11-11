// repositories/mongo-createDonor.ts
import DonorData from "../models/donor";

interface DonorBody {
    donorCpf: string;
    donorEmail: string;
    donorName: string;
    donorLocation: string;
}

export class MongoCreateDonorRepository {
    async createDonor(data: DonorBody) {
        try {
            const donor = new DonorData(data);
            return await donor.save();
        } catch (error) {
            console.error("Erro ao salvar doador no banco de dados:", error);
            throw error; // Lançar erro para ser capturado pelo controlador
        }
    }
}
