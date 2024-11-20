// model/sponsor.ts
import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
    sponsorName: {type: String, required: true},
    sponsorEmail: {type: String, required: true},
    sponsorPhone: {type: String, required: true},
    sponsorCnpj: {type: String, required: true},
    sponsorLaw: {type: String, required: true},
});

const SponsorData = mongoose.model("SponsorData",sponsorSchema);

export default SponsorData;