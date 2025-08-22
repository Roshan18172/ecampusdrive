const mongoose = require('mongoose');
const { Schema } = mongoose
const DriveSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    packageOffered: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    applicants: [
        {
            student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
            appliedAt: { type: Date, default: Date.now }
        }
    ],
    postedAt: { type: Date, default: Date.now }
});

const Drive = mongoose.model('Drive', DriveSchema);
module.exports = Drive
