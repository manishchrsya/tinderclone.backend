const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            minLength: 4,
            maxLength: 10,
        },
        lastName: {
            type: String,
            trim: true,
            maxLength: 16,
        },
        emailId: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true

        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
            maxLength: 16,
        },
        age: {
            type: Number,
            trim: true,
            maxLength: 2,
            min: 18
        },
        gender: {
            type: String,
            trim: true,
            validate: (value) => {
                if (!["male", "female", "other"].includes(value.toLowerCase())) {
                    throw new Error("Invalid gender value");
                }
            }
        },
        photoUrl: {
            type: String,
            trim: true,
        },
        about: {
            type: String,
            default: "this is default about of the user",
            trim: true,
            minLength: 20,
        },
        skills: {
            type: [String],
        },
    }, { timestamps: true });

const UserModel = new mongoose.model("User", userSchema);
module.exports = { UserModel };