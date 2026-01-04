const mongoose = require("mongoose");
const url = "mongodb+srv://chaurasiyamns_db_user:4JJNRpMTIlvw9KIC@cluster0.f422hj0.mongodb.net/?appName=Cluster0/tinder-clone";

const connectDB = async () => {
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.log("connection failed", error);
    }
};

module.exports = { connectDB };

