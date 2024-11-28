// models/donor.ts
import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  donorCpf: { type: String, required: true },
  donorEmail: { type: String, required: true },
  donorName: { type: String, required: true },
  donorLocation: { type: String, required: true },
  donorPhone: { type: String, required: true },
  donationDate: { type: Date, required: true },
  donorNotes: { type: String },
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: "Donation" },
});

const DonorData = mongoose.model("DonorData", donorSchema);

export default DonorData;
