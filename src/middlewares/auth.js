const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            ;
            res.status(401).send("Invalid Token");
        }
        const decodedObj = jwt.verify(token, "TinderCLoneSecretKey");

        const { _id } = decodedObj;

        const user = await UserModel.findById(_id);
        if (!user) {
            res.status(404).send("User not found!");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).send(error.message || "Something went wrong.");
    }
};

module.exports = { userAuth };