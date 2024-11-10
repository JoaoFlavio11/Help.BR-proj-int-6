// models/donor.ts
import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
    donorCpf: {type: String, required: true},
    donorEmail: {type: String, required: true},
    donorName: {type: String, required: true},
    donorLocation: {type: String, required: true},
});

const DonorData = mongoose.model("DonorData", donorSchema);

export default DonorData;