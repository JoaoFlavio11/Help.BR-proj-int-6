import SponsorData from "../models/sponsor";

interface SponsorBody {
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhone: string;
  sponsorCnpj: string;
  sponsorLaw: string;
}

export class MongoCreateSponsorRepository {
  async createSponsor(data: SponsorBody) {
    try {
      const sponsor = new SponsorData(data);
      return await sponsor.save();
    } catch (error) {
      console.error("Erro ao salvar patrocinador no banco de dados:", error);
      throw error;
    }
  }
}
