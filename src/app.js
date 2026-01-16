const express = require("express");
const { connectDB } = require("./config/database");
const { UserModel } = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { userAuth } = require("./middlewares/auth");

const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

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
            const isPasswordMatch = await user.validatePassword(password);
            if (isPasswordMatch) {
                const token = await user.getJWT();
                res.cookie("token", token); // Set a cookie named 'token' with the generated token
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

    app.get("/profile", userAuth, async (req, res) => {

        try {
            const { password, ...restProfileDetails } = req.user.toObject(); // Destructure to exclude password            
            res.send({
                data: restProfileDetails,
                message: "User profile fetched successfully"
            });
            // }
        } catch (error) {
            res.status(500).send({ // Send a 500 Internal Server Error status code
                message: "Invalid token",
                error: error.message
            });
        }

    });

    app.post("/sendConnectionRequest", userAuth, async (req, res) => {
        try {
            const user = req.user;
            // sending a connection request
            console.log("sending connection request");
            res.send(user.firstName + 'sent the connection request!');

        } catch (error) {
            res.status(500).send(error.message || "Something went wrong!");
        }
    });

    // app.patch("/updateUser/:id", async (req, res) => {
    //     try {
    //         const userId = req.params?.id;
    //         const updatedPayload = req.body;
    //         const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "gender"];
    //         const isAllowedUpdates = Object.keys(updatedPayload).every((key) => ALLOWED_UPDATES.includes(key));
    //         if (!isAllowedUpdates) {
    //             throw new Error("Update is not allowed");
    //         }
    //         await UserModel.findByIdAndUpdate(userId, updatedPayload, { new: true, runValidators: true }); // Update user by ID with the new data
    //         res.send({
    //             message: "User updated successfully"
    //         });
    //     } catch (err) {
    //         res.status(500).send({ // Send a 500 Internal Server Error status code
    //             message: "Error updating user",
    //             error: err.message
    //         });
    //     }
    // },);

    // app.get("/user", async (req, res) => {
    //     try {
    //         const email = req.body.emailId;
    //         const user = await UserModel.find({ emailId: email }); // Fetch user by email from the database
    //         if (user.length === 0) {
    //             return res.status(404).send({ // Send a 404 Not Found status code
    //                 message: "User not found"
    //             });
    //         } else {
    //             res.send({
    //                 data: user,
    //                 message: "Users fetched successfully"
    //             });
    //         }
    //     } catch (err) {
    //         res.status(500).send({ // Send a 500 Internal Server Error status code
    //             message: "Error fetching users",
    //             error: err.message
    //         });
    //     }
    // });

    // app.get("/users", async (req, res) => {
    //     try {
    //         // const email = req.body.emailId;
    //         const user = await UserModel.find({}); // Fetch user by email from the database
    //         if (user.length === 0) {
    //             return res.status(404).send({ // Send a 404 Not Found status code
    //                 message: "User not found"
    //             });
    //         } else {
    //             const filteredUsers = user.map(({ password, ...rest }) => rest);
    //             res.send({
    //                 data: filteredUsers,
    //                 message: "Users fetched successfully"
    //             });
    //         }
    //     } catch (err) {
    //         res.status(500).send({ // Send a 500 Internal Server Error status code
    //             message: "Error fetching users",
    //             error: err.message
    //         });
    //     }
    // });

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
