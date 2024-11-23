//models/location.ts
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    locationName: { type: String, required: true},
    locationAdress: {type: String, required: true},
    locationNumber: {type: Number, required: true},
    locationPostalCode: {type: Number, required: true},
    locationCity: {type: String, required: true},
});

const LocationData = mongoose.model("Location", locationSchema);

export default LocationData;