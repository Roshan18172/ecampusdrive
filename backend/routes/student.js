const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Student = require('../models/Student');
const Drive =  require('../models/Drive')
const Teacher = require('../models/Teacher')

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
        const { profile } = req.body;  // expecting profile object

        let student = await Student.findById(req.user.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        student.profile = { ...student.profile, ...profile };
        await student.save();

        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Get all students (for teacher dashboard)
// ------------------
router.get('/all', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ error: "Access denied. Only teachers can view this." });
        }

        const students = await Student.find().select('-password');
        res.json(students);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Get logged-in teacher's profile
// ------------------
router.get('/teacher', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ error: 'Access denied. Only teachers can view this.' });
        }

        const teacher = await Teacher.findById(req.user.id).select('-password');
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
