import LocationData from "../models/location";

interface LocationBody {
    locationName: string;
    locationAdress: string;
    locationNumber: number;
    locationPostalCode: number;
    locationCity: string;
}

export class MongoCreateLocationRepository{
    async createLocation(data: LocationBody){
        try{
            const location = new LocationData(data);
            return await location.save();
        } catch (error) {
            console.error("Erro ao salvar doador no banco de dados:", error);
            throw error;
        }
    }
}