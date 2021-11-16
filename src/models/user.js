const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    following: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;