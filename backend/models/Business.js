const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  businessId: { type: String, unique: true },
  name: { type: String, required: true },
  yearEstablished: { type: Number, required: true },
  accountingProvider: { type: String, required: true },
  loanAmount: { type: Number, required: true },
});

// Pre-save middleware to generate businessId
businessSchema.pre("save", async function(next) {
  if (!this.businessId) {
    // Find the highest businessId and increment it
    const highestBusiness = await Business.findOne(
      {},
      {},
      { sort: { businessId: -1 } }
    );
    const newId =
      (highestBusiness ? parseInt(highestBusiness.businessId) : 0) + 1;

    // Format the newId with leading zeros to ensure a three-digit format
    this.businessId = String(newId).padStart(3, "0");
  }
  next();
});
const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
