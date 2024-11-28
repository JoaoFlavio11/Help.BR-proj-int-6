import { MongoCreateSponsorRepository } from "../repositories/mongo-createSponsor";

interface SponsorBody {
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhone: string;
  sponsorCnpj: string;
  sponsorLaw: string;
}

export class CreateSponsorController {
  constructor(private createSponsorRepository: MongoCreateSponsorRepository) {}
  async handle({ body }: { body: SponsorBody }) {
    console.log("Dados recebidos no controller:", body); // Log para inspecionar

    if (
      !body.sponsorName ||
      !body.sponsorEmail ||
      !body.sponsorPhone ||
      !body.sponsorCnpj ||
      !body.sponsorLaw
    ) {
      console.error("Dados incompletos recebidos:", body);
      return {
        body: "Dados incompletos no corpo da requisição",
        statusCode: 400,
      };
    }

    try {
      const sponsor = await this.createSponsorRepository.createSponsor(body);
      console.log("Patrocinador cadastrado:", sponsor);
      return { body: sponsor, statusCode: 201 };
    } catch (error) {
      console.error("Erro ao cadastrar patrocinador:", error);
      return { body: "Erro ao cadastrar patrocinador", statusCode: 500 };
    }
  }
}
