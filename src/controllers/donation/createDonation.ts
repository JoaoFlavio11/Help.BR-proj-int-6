// controllers/donation/createDonation.ts
import { MongoCreateDonationRepository } from "../../repositories/donation/mongo-createDonation";

interface DonationBody {
  donationName: string;
  donationDescription: string;
  itemType: string;
  quantity: number;
}

export class CreateDonationController {
  constructor(
    private createDonationRepository: MongoCreateDonationRepository,
  ) {}

  async handle({ body }: { body: DonationBody }) {
    try {
      const donation = await this.createDonationRepository.createDonation({
        donationName: body.donationName,
        donationDescription: body.donationDescription,
        itemType: body.itemType,
        quantity: body.quantity,
      });
      return { body: donation, statusCode: 201 };
    } catch {
      return { body: "Erro ao cadastrar doação", statusCode: 500 };
    }
  }
}
