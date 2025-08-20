const mongoose = require('mongoose')
const { Schema } = mongoose
const StudentSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    profile: {
        course: String,
        year: Number,
        skills: [String],
    },
    appliedDrives: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drive' }]
})

const Student = mongoose.model('User', StudentSchema)
module.exports = Student