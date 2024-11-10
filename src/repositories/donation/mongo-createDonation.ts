// repositories/donation/mongo-createDonation.ts
import Donation from "../../models/donations";

interface DonationData {
  donationName: string;
  donationDescription: string;
  itemType: string;
  quantity: number;
}

export class MongoCreateDonationRepository {
  async createDonation(data: DonationData) {
    const donation = new Donation(data);
    return await donation.save();
  }
}


