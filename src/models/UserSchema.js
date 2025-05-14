const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    verificationCode: Number,
    isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);