// repositories mongo-createDonor.ts
import DonorData from "../models/donor";

interface DonorData{
    donorCpf: string;
    donorEmail: string;
    donorName: string;
    donorLocation:string;
}

export class MongoCreateDonorRepository{
    async createDonor(data: DonorData){
        const donor = new DonorData(data);
        return await donor.save()
    }
}