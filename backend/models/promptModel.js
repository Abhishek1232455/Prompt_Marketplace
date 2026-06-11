const mongoose = require("mongoose");
const promptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  promptDescription: {
    type: String,
    required: true
  },
  promptData: {
    type: String,
    required: true
  }
},
{ timestamps: true }
);

// Create the User model
module.exports = mongoose.model("prompts", promptSchema);
