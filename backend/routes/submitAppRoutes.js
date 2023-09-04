const express = require("express");
const router = express.Router();
const submitAppController = require("../controllers/submitApplicationController");
// Define the balance sheet route
router.post("/submit-application", submitAppController.submitApplication);

module.exports = router;
