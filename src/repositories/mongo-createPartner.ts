// repositories/mongo-createPartner.ts
import PartnerData from "../models/partner";

interface PartnerBody {
    partnerName: string;
    partnerEmail: string;
    partnerPhone: string;
    partnerCpf: string;
    partnerAge: string;
}

export class MongoCreatePartnerRepository{
    async createPartner(data: PartnerBody){
        try{
            const partner = new PartnerData(data);
            return await partner.save();
        } catch (error) {
            console.log("Erro ao salvar parceiro no banco de dados:", error);
            throw error;
        }
    }
}