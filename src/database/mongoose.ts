// database/mongoose.ts
import mongoose from "mongoose";

export const connectToMongoose = async (): Promise<void> => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/donationsDb";
    await mongoose.connect(uri);
    console.log("Mongoose connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB with mongoose:", error);
    throw error;
  }
};
