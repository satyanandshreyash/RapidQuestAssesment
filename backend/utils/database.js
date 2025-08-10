import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'whatsapp',
        });
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error: ", err);
    }
}