const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();


router.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        // sending a connection request
        console.log("sending connection request");
        res.send(user.firstName + 'sent the connection request!');

    } catch (error) {
        res.status(500).send(error.message || "Something went wrong!");
    }
});

module.exports = router;