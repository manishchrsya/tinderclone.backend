const express = require("express");
const bcrypt = require('bcrypt');
const { validateSignupData } = require("../utils/validation");
const { UserModel } = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
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

router.post("/login", async (req, res) => {
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





module.exports = router;