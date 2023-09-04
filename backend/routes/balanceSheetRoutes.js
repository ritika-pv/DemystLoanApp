const express = require("express");
const router = express.Router();
const balanceSheetController = require("../controllers/balanceSheetController");
const axios = require("axios");

// Define the balance sheet route
router.post("/balance-sheet", balanceSheetController.getBalanceSheet);

module.exports = router;
