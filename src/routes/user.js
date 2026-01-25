const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectRequests");

const router = Router();

// get all the connections of the user
router.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        console.log("testing review request triggered");

        const loggedInUser = req.user;
        const requestReceived = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "about", "age", "skills"]);
        res.send({ message: "connections fetched", data: requestReceived });
    } catch (error) {
        res.status(400).send(error.message || "Something went wrong");
    }
});

router.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await connectionRequestModel.find({
            status: "accepted",
            "$or": [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "about", "age", "skills"]);
        const data = connections.map(({ _id, fromUserId, createdAt, updatedAt }) => ({ _id, fromUserId, createdAt, updatedAt }));
        res.send({ messages: "connections loaded successfully", data });

    } catch (error) {
        res.status(400).send(error.message || "Something went wrong");
    }

});


module.exports = router;