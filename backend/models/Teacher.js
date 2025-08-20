const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Optional: additional info about teacher
    department: {
        type: String
    },
    postedDrives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drive'
    }]
}, { timestamps: true });

const Teacher=mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher