const express = require("express");
const { connectDB } = require("./config/database");

const userObj = {
    "firstName": "Manish",
    "lastName": "Chaurasiya",
    "age": 29,
    "gender": "Male",
    "emailId": "chaurasiya.mns@gmail.com",
    "password": "test@123"
};

const app = express();
// app.use(express.json());
app.post("/signup", (req, res) => {
    res.send({
        message: "Signup API called"
    });
});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("server started of the tinder on port 3000...");
    });
}).catch((err) => {
    console.log("Database connection failed", err);
});



