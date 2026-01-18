const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectRequests");
const { UserModel } = require("../models/user");

const router = express.Router();


router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const allowedStatus = ["ignore", "interested"];
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        if (!allowedStatus.includes(status)) {
            res.status(400).send({ message: "invalid status type" + status });
        }
        const toUser = await UserModel.findById(toUserId);

        if (!toUser) {
            res.status(400).send("Invalid receiver id");
        }

        // if any connection request is already exist:---
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ]
        });

        if (existingConnectionRequest) {
            res.status(400).send("Connection request already exist");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.send({
            message: req.user.firstName + "is" + status + toUser.firstName,
            data
        });
    } catch (error) {
        res.status(500).send(error.message || "Something went wrong!");
    }
});

module.exports = router;