const jwt = require('jsonwebtoken');
const User = require('../models/Student');

const JWT_SECRET = "mysecretkey"; // Secret key for JWT

// const fetchUser = async (req, res, next) => {
//     // Get the user from the JWT token and add it to req.user
//     const token = req.header('auth-token');
//     if (!token) {
//         return res.status(401).send({ error: "Please authenticate using a valid token" });
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = await User.findById(data.user.id).select("-password");
//         next();
//     } catch (error) {
//         res.status(401).send({ error: "Please authenticate using a valid token" });
//     }
// };

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({ error: "Access Denied" });

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid Token" });
    }
};
module.exports = fetchUser;