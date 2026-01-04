const express = require("express");
const { connectDB } = require("./config/database");
const { UserModel } = require("./models/user");

const app = express();
app.use(express.json());

const appApi = async () => {
    app.post("/signup", (req, res) => {
        const user = new UserModel(req.body);
        user.save().then((response) => {
            res.send({
                data: response,
                message: "User signed up successfully"
            });
        }).catch((err) => {
            res.status(500).send({
                message: "Error signing up user",
                error: err.message
            });
        });
    });

    connectDB().then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("server started of the tinder on port 3000...");
        });
    }).catch((err) => {
        console.log("Database connection failed", err);
        process.exit(1);
    });
};

appApi();
