const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        unique: true,

    },
    password: {
        type: String
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    }
});

const UserModel = new mongoose.model("User", userSchema);
module.exports = { UserModel };