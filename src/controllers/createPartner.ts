import { MongoCreatePartnerRepository } from "../repositories/mongo-createPartner";

interface PartnerBody {
  partnerName: string;
  partnerEmail: string;
  partnerPhone: string;
  partnerCpf: string;
  partnerAge: string;
}

export class CreatePartnerController {
  constructor(private createPartnerRepository: MongoCreatePartnerRepository) {}

  async handle({ body }: { body: PartnerBody }) {
    console.log("Dados recebidos no controller:", body);

    const { partnerName, partnerEmail, partnerPhone, partnerCpf, partnerAge } =
      body;

    if (
      !partnerName ||
      !partnerEmail ||
      !partnerPhone ||
      !partnerCpf ||
      !partnerAge
    ) {
      console.log("Dados incompletos:", body); // Log para depuração
      return {
        body: "Dados incompletos no corpo da requisição",
        statusCode: 400,
      };
    }

    try {
      const partner = await this.createPartnerRepository.createPartner(body);
      console.log("Parceiro criado com sucesso:", partner);
      return { body: partner, statusCode: 201 };
    } catch (error) {
      console.error("Erro ao cadastrar dados de parceiro:", error);
      return { body: "Erro ao cadastrar dados de parceiro", statusCode: 500 };
    }
  }
}


