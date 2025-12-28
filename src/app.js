const express = require("express");

const app = express();


app.get("/user/:userId", (req, res) => {
    // res.send("user route get api");
    res.send({ name: "Manish", age: 29, city: "Noida" });
});

app.post("/user", (req, res) => {
    res.send("data saved to server");
});

// app.patch
// app.put
// app.delete


// app.use("/", (req, res) => {
//     res.send("base route");
// });

app.use("/test", (req, res) => {
    console.log("req manish");
    res.send("test route");
});


app.listen(3000, () => {
    console.log("server started of the tinder on port 3000...");
});

