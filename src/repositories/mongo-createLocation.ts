import LocationData, { ILocation } from "../models/location";

interface LocationBody {
    locationName: string;
    locationAdress: string;
    locationNumber: number;
    locationPostalCode: number;
    locationCity: string;
}

export class MongoCreateLocationRepository {
    async createLocation(data: LocationBody): Promise<ILocation> {
        try {
            const location = new LocationData(data);
            return await location.save();
        } catch (error) {
            console.error("Erro ao salvar localização no banco de dados:", error);
            throw error;
        }
    }
}
