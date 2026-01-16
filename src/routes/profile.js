const express = require("express");
const { userAuth } = require("../middlewares/auth");

const router = express.Router();


router.get("/profile", userAuth, async (req, res) => {
    try {
        const { password, ...restProfileDetails } = req.user.toObject(); // Destructure to exclude password            
        res.send({
            data: restProfileDetails,
            message: "User profile fetched successfully"
        });
        // }
    } catch (error) {
        res.status(500).send({ // Send a 500 Internal Server Error status code
            message: "Invalid token",
            error: error.message
        });
    }

});

module.exports = router;