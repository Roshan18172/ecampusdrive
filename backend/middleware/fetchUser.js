const jwt = require('jsonwebtoken');
const User = require('../models/Student');

const JWT_SECRET = "mysecretkey"; // Secret key for JWT

const fetchUser = async (req, res, next) => {
    // Get the user from the JWT token and add it to req.user
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(data.user.id).select("-password");
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

// Middleware to fetch user details from the JWT token
// This middleware will be used in routes to ensure the user is authenticated
// and to attach the user information to the request object.
// It verifies the token and retrieves the user details, excluding the password.
module.exports = fetchUser;