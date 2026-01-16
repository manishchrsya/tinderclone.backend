const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require('cookie-parser');

const app = express(); // Create an Express application
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

const appApi = async () => {
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
