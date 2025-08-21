const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
 const JWT_SECRET="yourSuperSecretKey123"

// ------------------
// Register Student/Teacher
// ------------------
router.post('/register', [
    body('name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()})
    const { name, email, password, role, department } = req.body;
    try {
        let user;
        if (role === 'student') {
            user = await Student.findOne({ email:req.body.email });
        } else {
            user = await Teacher.findOne({ email:req.body.email });
        }
        if (user) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser;
        if (role === 'student') {
            newUser = await Student.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
        } else {
            newUser = await Teacher.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                department: req.body.department
            });
        }
        
        const payload = { user: { id: newUser._id, role } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Login Student/Teacher
// ------------------
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'student') {
            user = await Student.findOne({ email });
        } else {
            user = await Teacher.findOne({ email });
        }

        if (!user) return res.status(400).json({ error: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

        const payload = { user: { id: user._id, role } };
        const token = jwt.sign(payload,JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});







module.exports = router;