const mongoose = require("mongoose");

async function connectDatabase() {
    const mongoUri = process.env.MONGO_URI;

    if(!mongoUri) {
        console.warn("MONGO_URI is not set. Contact submissions will be unavailable until MongoDB is configured.");
        return;
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully.");
    }
    catch(error) {
        console.error("MongoDB connection failed:", error.message);

        if(process.env.NODE_ENV === "production") {
            process.exit(1);
        }
    }
}

module.exports = connectDatabase;
