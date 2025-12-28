const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    console.log("req manish");
    res.send("Hello from the server");
});

app.use;

app.listen(3000, () => {
    console.log("server started of the tinder on port 3000...");
});

