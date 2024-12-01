import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donationName: { type: String, required: true },
  donationDescription: { type: String, required: true },
  itemType: { type: String, required: true },
  quantity: { type: Number, required: true },
  chavePix: { type: String, required: true },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
