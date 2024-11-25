import { MongoCreateLocationRepository } from "../repositories/mongo-createLocation";

interface LocationBody{
    locationName: string;
    locationAdress: string;
    locationNumber: number;
    locationPostalCode: number;
    locationCity: string;
}

export class CreateLocationController {
    constructor( private createLocationRepository: MongoCreateLocationRepository) {}
    async handle({body}: {body: LocationBody}) {
        console.log("Dados recebidos no controller:", body); // Log

        if(!body.locationName || !body.locationAdress || !body.locationNumber || !body.locationPostalCode || !body.locationCity) {
            console.error("Dados incompletos recebidos:", body);
            return { body: "Dados incompletos no corpo da requisição", statusCode: 400 };
        }

        try{
            const location = await this.createLocationRepository.createLocation(body);
            console.log('Localização cadastrada:', location);
            return {body: location, statusCode:201};
        } catch (error) {
            console.error("Erro ao cadastrar localização:", error);
            return { body: "Erro ao cadastrar localização", statusCode: 500 };
        }
    }
}