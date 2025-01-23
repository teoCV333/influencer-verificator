import { connect } from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
    try {
        await connect(env.mongoURI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
