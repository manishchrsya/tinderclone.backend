const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("First name and last name are required.");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Invalid email address.");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough.");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["photoUrl", "about", "skills", "gender"];
    const isAllowedUpdates = Object.keys(req.body).every((key) => allowedEditFields.includes(key));
    return isAllowedUpdates;
};

module.exports = { validateSignupData, validateEditProfileData };