const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Student = require('../models/Student');
const Drive =  require('../models/Drive')

// ------------------
// Get logged-in student profile
// ------------------
router.get('/profile', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: "Access denied" });
        }

        const student = await Student.findById(req.user.id).select('-password').populate('appliedDrives', 'title description eligibility');
        if (!student) return res.status(404).json({ error: "Student not found" });

        res.json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Update student profile
// ------------------
router.put('/profile', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: "Access denied" });
        }

        const { course, year, skills } = req.body;

        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { profile: { course, year, skills} },
            { new: true, runValidators: true }
        ).select('-password');

        res.json(student);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Get all students (for teacher dashboard)
// ------------------
router.get('/', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ error: "Access denied" });
        }

        const students = await Student.find().select('-password');
        res.json(students);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
