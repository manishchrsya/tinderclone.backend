const mongoose = require("mongoose");
const url = process.env.MONGO_CONNECTION_URL;
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
