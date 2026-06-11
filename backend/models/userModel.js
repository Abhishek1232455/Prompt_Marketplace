const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensures that each email is unique
  },
  prompts: {
    type: [String],
    default: []
  },
  password: {
    type: String,
    required: true
  },
  userCredits: {
    type: Number,
    default: 20
  },
  role: {
    //bollen user or admin
    type: String,
    enum: ["User", "Admin"],
    default: "User"
  }
});

// Create the User model
module.exports = mongoose.model("users", promptSchema);
