const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please input username"],
    },
    email: {
        type: String,
        required: [true, "Please input email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String, 
        required: [true, "Add Password"],
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema)