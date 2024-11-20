// models/partner.ts
import mongoose from "mongoose"

const partnerSchema = new mongoose.Schema({
    partnerName: {type: String, required: true},
    partnerEmail: {type: String, required: true},
    partnerPhone: {type: String, required: true},
    partnerCpf: {type: String, required: true},
    partnerAge: {type: String, required: true},
});

const PartnerData = mongoose.model("PartnerData", partnerSchema);

export default PartnerData;