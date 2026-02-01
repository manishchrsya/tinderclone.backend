const mongoose = require("mongoose");
const url = "mongodb+srv://chaurasiyamns_db_user:PdgSduhQRldjezqt@cluster0.f422hj0.mongodb.net/?appName=Cluster0/tinderClone";

const connectDB = async () => {
    try {
        return await mongoose.connect(url, {
            dbName: "tinderClone",
        });
    } catch (error) {
        console.log("connection failed", error);
        throw new Error(error);
    }
};

module.exports = { connectDB };
