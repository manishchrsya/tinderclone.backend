const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
    console.log("home page");
    // res.send("home page");
    next();
});

app.use("/user",
    (req, res, next) => {
        next();
        console.log("handler 1");
        res.send("users list");
        // next();
    });

app.use("/user",
    (req, res, next) => {
        next();
        console.log("handler 2");
        res.send("users list 1");
    });

app.listen(3000, () => {
    console.log("server started of the tinder on port 3000...");
});

