const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { connectDB } = require("./config/database");

const app = express();

// Handle Auth middleware for all Requests to /admin
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
    res.send({ token: "98327yuiedqoieu2913uoiqwueoi", message: "user logged in successfully", status: "success", name: "Manish Chaurasiya" });
});

app.get("/user", userAuth, (req, res) => {
    res.send("user data fetched");
});

app.get("/admin/getAlldata", (req, res) => {
    try {
        res.send("All data fetched");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/admin/deleteUser", (req, res) => {
    // check admin authentication here
    res.send("admin User deleted");
    // Logic of fetching all data
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("server started of the tinder on port 3000...");
    });
}).catch((err) => {
    console.log("Database connection failed", err);
});



