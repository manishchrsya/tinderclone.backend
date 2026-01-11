const express = require("express");
const { connectDB } = require("./config/database");
const { UserModel } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require('bcrypt');

const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON request bodies

const appApi = async () => {
    app.post("/signup", async (req, res) => {
        try {
            // validate the incoming signup data
            validateSignupData(req);

            // Encript the password

            const passwordHash = await bcrypt.hash(req.body.password, 10);
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                password: passwordHash
            };
            const user = new UserModel(userData);
            user.save().then((response) => {
                res.send({
                    message: "User signed up successfully"
                });
            }).catch((err) => {
                res.status(500).send({ /// Send a 500 Internal Server Error status code
                    message: "Error signing up user",
                    error: err.message
                });
            });
        } catch (error) {
            res.status(500).send({ /// Send a 500 Internal Server Error status code
                message: "Error signing up user",
                error: err.message
            });
        }

    });

    app.post("/login", async (req, res) => {
        try {
            const { emailId, password } = req.body;
            const user = await UserModel.findOne({ emailId: emailId }); // Fetch user by email from the database
            if (!user) {
                return res.status(404).send({ // Send a 404 Not Found status code
                    message: "User not found"
                });
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                res.send({
                    message: "User logged in successfully"
                });
            } else {
                return res.status(401).send({ // Send a 401 Unauthorized status code
                    message: "Invalid password"
                });
            }

        } catch (err) {
            res.status(500).send({ // Send a 500 Internal Server Error status code
                message: "Error logging in user",
                error: err.message
            });
        }
    });

    app.patch("/updateUser/:id", async (req, res) => {
        try {
            const userId = req.params?.id;
            const updatedPayload = req.body;
            const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "gender"];
            const isAllowedUpdates = Object.keys(updatedPayload).every((key) => ALLOWED_UPDATES.includes(key));
            if (!isAllowedUpdates) {
                throw new Error("Update is not allowed");
            }
            await UserModel.findByIdAndUpdate(userId, updatedPayload, { new: true, runValidators: true }); // Update user by ID with the new data
            res.send({
                message: "User updated successfully"
            });
        } catch (err) {
            res.status(500).send({ // Send a 500 Internal Server Error status code
                message: "Error updating user",
                error: err.message
            });
        }
    },);


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
