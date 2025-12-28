const express = require("express");

const app = express();

app.use("/user",
    (req, res, next) => {
        next();
        console.log("handler 1");
        // res.send("users list");
    }, (req, res, next) => {
        console.log("handler 2");
        res.send("user created");
        next();
    });
app.listen(3000, () => {
    console.log("server started of the tinder on port 3000...");
});

