const mongoose = require('mongoose');
const { Schema } = mongoose
const DriveSchema = new Schema({
    title: String,
    description: String,
    eligibility: String,
    packageOffered: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    postedAt: { type: Date, default: Date.now }
});

const Drive = mongoose.model('Drive', DriveSchema);
module.exports = Drive
