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

module.exports = { validateSignupData };