const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { MESSAGE } = require("../constants/messageConstants");
const { API_URL } = require("../constants/apiConstants");
const { validateEditProfileData } = require("../utils/validation");

const router = express.Router();

router.get(API_URL.PROFILE_VIEW, userAuth, async (req, res) => {
    try {
        const { password, ...restProfileDetails } = req.user.toObject(); // Destructure to exclude password            
        res.send({
            data: restProfileDetails,
            message: MESSAGE.USER_FETCHED
        });
    } catch (error) {
        res.status(500).send({ // Send a 500 Internal Server Error status code
            message: MESSAGE.INVALID_TOKEN,
            error: error.message
        });
    }

});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const isAllowedUpdates = validateEditProfileData(req);
        if (isAllowedUpdates) {
            const loggedInUser = req.user;
            Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
            await loggedInUser.save();
            const { password, ...rest } = loggedInUser.toObject();
            res.send({ message: "User details updated", data: rest });
        } else {
            res.status(400).send("Invalid payload");
        }
    } catch (error) {
        res.status(500).send(error.message || "Something went wrong");
    }
});


module.exports = router;