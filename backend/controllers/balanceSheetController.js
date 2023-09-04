const https = require("https");
const Business = require("../models/Business");
const mongoose = require("mongoose");

const getBalanceSheet = async (req, res) => {
  try {
    const { accountingProvider } = req.body;

    //requesting balance sheet from third party (accounting software)
    let path_xero = "/bin/6c67359b9143";
    let path_myob = "/bin/c75a840a1eae";

    const options = {
      hostname: "json.extendsclass.com",
      path: accountingProvider === "xero" ? path_xero : path_myob,
      method: "GET",
    };

    // Send an HTTP GET request using Node.js built-in 'https' module
    const request = https.request(options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", async () => {
        try {
          // Assuming the data structure matches the balance sheet format
          const balanceSheet = JSON.parse(data);

          // Create a new Business instance with the fetched data
          const newBusiness = new Business({
            name: req.body.name,
            yearEstablished: req.body.yearEstablished,
            accountingProvider: req.body.accountingProvider,
            loanAmount: req.body.loanAmount,
          });

          // Save the new business entry to the MongoDB database
          await newBusiness.save();

          res
            .status(200)
            .json({ balanceSheet, message: "Business saved successfully" });
        } catch (error) {
          console.error("Error creating and saving business entry:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
    });

    request.on("error", (error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });

    request.end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBalanceSheet,
};
