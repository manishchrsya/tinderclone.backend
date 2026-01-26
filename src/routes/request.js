const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectRequests");
const { UserModel } = require("../models/user");
const { API_URL } = require("../constants/apiConstants");

const router = express.Router();


router.post(`${API_URL.REQUEST_SEND}/:status/:toUserId`, userAuth, async (req, res) => {
    try {
        const allowedStatus = ["ignore", "interested"];
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        if (!allowedStatus.includes(status)) {
            res.status(400).send({ message: "invalid status type" + status });
        }
        if (fromUserId.toString() === toUserId.toString()) {
            res.status(400).send({ message: "Can not send request to yourself" });
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

router.patch(`${API_URL.REQUEST_REVIEW}/:status/:requestId`, userAuth, async (req, res) => {
    try {
        const status = req.params.status;
        const requestId = req.params.requestId;
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            res.status(400).send("status" + status + "is not allowed ");
        }
        const connection = await ConnectionRequest.findById(requestId);
        if (!connection) {
            res.status(404).send("connection request not found");
        }
        if (connection.status !== "interested") {
            res.status(500).send("This connection can not be accepted");
        }
        connection.status = status;
        await connection.save();
        res.send("Status changed successfully");

    } catch (error) {
        res.status(500).send(error.message || "Something went wrong.");

    }

});

module.exports = router;