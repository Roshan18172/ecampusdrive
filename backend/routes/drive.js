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
        res.json({ success: true, message: "Applied successfully" });
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
// GET a drive by ID for teachers
router.get('/:id', async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id);
        if (!drive) {
            return res.status(404).json({ error: "Drive not found" });
        }
        res.json(drive);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// ------------------
// DELETE a drive by ID (Teacher only)
// ------------------
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        // Find the drive
        const drive = await Drive.findById(req.params.id);
        if (!drive) {
            return res.status(404).json({ error: "Drive not found" });
        }
        // Ensure only the teacher who created it can delete
        if (drive.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }
        // Delete the drive
        await Drive.findByIdAndDelete(req.params.id);
        // 🔥 Remove this drive ID from teacher's postedDrives
        await Teacher.findByIdAndUpdate(req.user.id, {
            $pull: { postedDrives: drive._id }
        });
        res.json({ success: true, message: "Drive deleted successfully" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update drive
router.put("/:id", fetchUser, async (req, res) => {
    try {
        const { title, description, eligibility, packageOffered } = req.body;

        let drive = await Drive.findById(req.params.id);
        if (!drive) return res.status(404).json({ error: "Drive not found" });

        // Check if user owns the drive (if needed)
        // if (drive.user.toString() !== req.user.id) {
        //   return res.status(401).send("Not Allowed");
        // }
        drive = await Drive.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, eligibility, packageOffered } },
            { new: true }
        );
        res.json(drive);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// Get all drives student applied to
router.get("/applied", fetchUser, async (req, res) => {
    try {
        const studentId = req.user.id;

        // find drives where studentId is inside appliedStudents array
        const drives = await Drive.find({ appliedStudents: studentId }).select("_id");

        const appliedDriveIds = drives.map((d) => d._id); // return only IDs
        res.json(appliedDriveIds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
module.exports = router;
