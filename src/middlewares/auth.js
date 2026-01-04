const adminAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== "Manish") {
        res.status(401).send("Unauthorized Access");
        return;
    }
    next();
};

const userAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token !== "Manish") {
        res.status(401).send("Unauthorized Access");
        return;
    }
    next();
};

module.exports = { adminAuth, userAuth };