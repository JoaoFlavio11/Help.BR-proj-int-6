import mongoose, { Document, Model } from "mongoose";

// Interface para a tipagem do documento
export interface ILocation extends Document {
  locationName: string;
  locationAdress: string;
  locationNumber: number;
  locationPostalCode: number;
  locationCity: string;
}

// Define o schema
const locationSchema = new mongoose.Schema<ILocation>({
  locationName: { type: String, required: true },
  locationAdress: { type: String, required: true },
  locationNumber: { type: Number, required: true },
  locationPostalCode: { type: Number, required: true },
  locationCity: { type: String, required: true },
});

// Modelo com tipagem explícita
const LocationData: Model<ILocation> = mongoose.model<ILocation>(
  "Location",
  locationSchema,
);

export default LocationData;
