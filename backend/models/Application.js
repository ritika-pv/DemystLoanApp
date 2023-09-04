const mongoose = require("mongoose");

// Define the schema for your documents
const applicationSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId, // Use MongoDB ObjectId for unique identifiers

    unique: true, // Ensure uniqueness of applicationId
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set a default value to the current date
  },
});

// Create a model from the schema
const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
