const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// JWT Secret
const JWT_SECRET = "yourSecretKeyHere";

// ---------------------------
// Register (Student or Teacher)
// ---------------------------
router.post(
    "/register",
    [
        body("name").isLength({ min: 3 }),
        body("email").isEmail(),
        body("password").isLength({ min: 5 }),
        body("role").isIn(["student", "teacher"]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password, role } = req.body;

            // Check if user already exists
            let existingUser =
                role === "student"
                    ? await Student.findOne({ email })
                    : await Teacher.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: "User already exists" });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            // Create user
            let user;
            if (role === "student") {
                user = new Student({ name, email, password: secPass });
                console.log("Incoming data:", req.body);

                await user.save();
            } else {
                user = new Teacher({ name, email, password: secPass });
                console.log("Incoming data:", req.body);

                await user.save();
            }

            res.status(200).json({ message: "Registration successful" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ---------------------------
// Login (Student or Teacher)
// ---------------------------
router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").exists(),
        body("role").isIn(["student", "teacher"]),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role } = req.body;

        try {
            let user =
                role === "student"
                    ? await Student.findOne({ email })
                    : await Teacher.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Invalid Credentials" });
            }

            const payload = {
                user: {
                    id: user.id,
                    role: role,
                },
            };

            const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            res.json({ authToken, role });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

module.exports = router;
