const { Router } = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectRequests");
const { UserModel } = require("../models/user");
const { API_URL } = require("../constants/apiConstants");

const router = Router();

// get all the connections of the user
router.get(API_URL.USER_REQUEST_RECEIVED, userAuth, async (req, res) => {
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

router.get(API_URL.USER_CONNECTIONS, userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connections = await connectionRequestModel.find({
            status: "accepted",
            "$or": [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "about", "age", "skills"])
            .populate("toUserId", ["firstName", "lastName", "photoUrl", "about", "age", "skills"]);
        const data = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.send({ messages: "Connections loaded successfully", data });

    } catch (error) {
        res.status(400).send(error.message || "Something went wrong");
    }

});

router.get(API_URL.USER_FEED, userAuth, async (req, res) => {
    try {
        /**
         * 1. loggedin user should not see his profile in the feed
         * 2. loggedin users should not the profiles he is in a connection with
         * 3. loggedin user should not see the profiles whom he has send 
         *    request/ignored or is rejected earlier or been done similar by other profile
         * 
         * */
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1).limit;


        const requests = await connectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");
        // .populate("fromUserId", "firstName").populate("toUserId", "firstName");
        // console.log("requests", requests);
        // console.log("request", requests, requests.length);
        const hideUsersFromFeed = new Set();
        requests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId);
            hideUsersFromFeed.add(request.toUserId);
        });

        const users = await UserModel.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(["firstName", "lastName", "photoUrl", "about", "age", "skills"]).skip(skip).limit(limit);

        res.send({ message: "success", data: users });
    } catch (error) {
        console.log("error", error);

    }
});

module.exports = router;