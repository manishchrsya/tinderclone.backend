const express = require("express");
const { connectDB } = require("./config/database");
const { UserModel } = require("./models/user");

const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON request bodies

const appApi = async () => {
    app.post("/signup", (req, res) => {
        const user = new UserModel(req.body); // Create a new user instance with the request body data
        user.save().then((response) => {
            res.send({
                data: response,
                message: "User signed up successfully"
            });
        }).catch((err) => {
            res.status(500).send({ /// Send a 500 Internal Server Error status code
                message: "Error signing up user",
                error: err.message
            });
        });
    });

    app.get("/user", async (req, res) => {
        try {
            const email = req.body.emailId;
            const user = await UserModel.find({ emailId: email }); // Fetch user by email from the database
            if (user.length === 0) {
                return res.status(404).send({ // Send a 404 Not Found status code
                    message: "User not found"
                });
            } else {
                res.send({
                    data: user,
                    message: "Users fetched successfully"
                });
            }
        } catch (err) {
            res.status(500).send({ // Send a 500 Internal Server Error status code
                message: "Error fetching users",
                error: err.message
            });
        }
    });

    app.get("/users", async (req, res) => {
        try {
            // const email = req.body.emailId;
            const user = await UserModel.find({}); // Fetch user by email from the database
            if (user.length === 0) {
                return res.status(404).send({ // Send a 404 Not Found status code
                    message: "User not found"
                });
            } else {
                res.send({
                    data: user,
                    message: "Users fetched successfully"
                });
            }
        } catch (err) {
            res.status(500).send({ // Send a 500 Internal Server Error status code
                message: "Error fetching users",
                error: err.message
            });
        }
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
