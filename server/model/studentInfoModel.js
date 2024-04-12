const mongoose = require('mongoose');

const studentInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    batch: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true,
        required: true
    },
    CID: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('studentInfo', studentInfoSchema);