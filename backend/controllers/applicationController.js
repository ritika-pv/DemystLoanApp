const Application = require("../models/Application");
const mongoose = require("mongoose");
// Controller to initiate an application
const initiateApplication = async (req, res) => {
  try {
    // Create a new application document
    const newApplication = new Application({
      applicationId: new mongoose.Types.ObjectId(), // Generate a new ObjectId
    });
    await newApplication.save();

    // Respond with the object ID of the created application
    res.status(201).json({ objectId: newApplication._id });
  } catch (error) {
    console.error("Error initiating application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  initiateApplication,
};
