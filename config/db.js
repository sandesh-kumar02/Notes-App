import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("database are connect");
  } catch (error) {
    console.log(error);
  }
};


export default connectDB;