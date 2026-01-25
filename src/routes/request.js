const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectRequests");
const { UserModel } = require("../models/user");
const connectionRequestModel = require("../models/connectRequests");

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

router.patch("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const status = req.params.status;
        const requestId = req.params.requestId;
        const loggedInUser = req.user._id;
        /**
         * cases:-
         * 1. user should be loggedin
         * 2. approver should only be the toUser
         * 3. if the status is ignored then that can not be accepted / rejected
         * 4. request id should be valid
         * */


        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            res.status(400).send("status" + status + "is not allowed ");
        }

        console.log("requestId", requestId, loggedInUser);

        // const connection;
        const connection = await ConnectionRequest.findById(requestId);
        console.log("connection", connection);



        // const connection = new ConnectionRequest({ _id: requestId, toUserId: loggedInUser, status: "interested" });
        if (!connection) {
            res.status(404).send("connection request not found");
        }
        if (connection.status !== "interested") {
            res.status(500).send("This connection can not be accepted");
        }
        connection.status = status;
        await connection.save();
        res.send("Status changed successfully");
        // connection.status = status;
        // await connection.save();
        // await connectionRequestModel.save();
        // res.send("status changed successfully");

    } catch (error) {
        // res;
        console.log("error", error);

    }

});

module.exports = router;