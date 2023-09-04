const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// Route to initiate an application
router.post("/initiate-application", applicationController.initiateApplication);

module.exports = router;
