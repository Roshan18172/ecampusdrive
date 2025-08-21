const express = require('express');
const router = express.Router();
const Drive = require('../models/Drive');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const fetchUser = require('../middleware/fetchUser');

// ------------------
// Teacher posts a new drive
// ------------------
router.post('/create', fetchUser, async (req, res) => {
    try {
        const { title, description, eligibility, packageOffered } = req.body;

        // Only teacher can post drive
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ error: "Access denied" });
        }

        const drive = await Drive.create({
            title,
            description,
            eligibility,
            packageOffered,
            postedBy: req.user.id
        });

        // Add drive to teacher's postedDrives
        await Teacher.findByIdAndUpdate(req.user.id, { $push: { postedDrives: drive._id } });

        res.json(drive);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Get all drives (for students to apply)
// ------------------
router.get('/', async (req, res) => {
    try {
        const drives = await Drive.find().populate('postedBy', 'name email');
        res.json(drives);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Student applies to a drive
// ------------------
router.post('/apply/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ error: "Only students can apply" });
        }

        const drive = await Drive.findById(req.params.id);
        const student = await Student.findById(req.user.id);

        if (!drive || !student) return res.status(404).json({ error: "Not found" });

        // Avoid duplicate applications
        if (drive.applicants.includes(student._id)) {
            return res.status(400).json({ error: "Already applied" });
        }

        drive.applicants.push(student._id);
        student.appliedDrives.push(drive._id);

        await drive.save();
        await student.save();

        res.json({ message: "Applied successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

// ------------------
// Teacher views applicants for a drive
// ------------------
router.get('/applicants/:id', fetchUser, async (req, res) => {
    try {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ error: "Access denied" });
        }

        const drive = await Drive.findById(req.params.id).populate('applicants', 'name email profile');
        if (!drive) return res.status(404).json({ error: "Drive not found" });

        // Only teacher who posted the drive can view applicants
        if (drive.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }

        res.json(drive.applicants);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
