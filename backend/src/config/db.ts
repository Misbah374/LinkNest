import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI as string;

  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(mongoURI);

  console.log("MongoDB connected");
};

export default connectDB;