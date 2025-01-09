const mongoose = require("mongoose");
const env = require("./env");

const connectDB = async () => {
    try {
        await mongoose.connect(env.mongoURI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);     
    }
}

module.exports = connectDB;