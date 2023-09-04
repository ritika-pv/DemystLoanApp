// Function to calculate the summary of profit or loss
const calculateSummaryProfitLoss = (balanceSheet) => {
  const summary = balanceSheet
    .slice(0, 12)
    .reduce((total, entry) => total + entry.profitOrLoss, 0);

  return summary;
};

//function to calculate avg assets value
const calculateAssets = (balanceSheet) => {
  const sumAssets = balanceSheet
    .slice(0, 12)
    .reduce((total, entry) => total + entry.assetsValue, 0);
  const avg = sumAssets / 12;

  return avg;
};
// Function to calculate the pre-assessment value
const calculatePreAssessment = (balanceSheet, loanAmount) => {
  let preAssessment = 20; // Default value

  // Calculate profit for the last 12 months
  const last12MonthsProfitLoss = calculateSummaryProfitLoss(balanceSheet);
  const avgAsset = calculateAssets(balanceSheet);
  // Calculate average asset value for the last 12 months
  const last12MonthsAvgAssets = avgAsset;

  // Check if profit was made in the last 12 months
  if (last12MonthsProfitLoss > 0) {
    preAssessment = 60;
  }

  // Check if average asset value is greater than the loan amount
  if (last12MonthsAvgAssets > loanAmount) {
    preAssessment = 100;
  }

  return preAssessment;
};
//Mocked the Third Party Api for current use
const decisionApi = (businessData) => {
  const { business, preAssessment } = businessData;
  const loanAmount = business.loanAmount;
  const preAssessmentAmount = parseFloat(preAssessment);
  const calculatedAmount = (preAssessmentAmount / 100) * loanAmount;
  const status = calculatedAmount > 0;

  return {
    status,
    amount: calculatedAmount.toFixed(2),
  };
};
// Function to call the Decision Tree API
const callDecisionTreeAPI = (businessData) => {
  try {
    // Call the decisionApi
    const decisionData = decisionApi(businessData);

    // Resolve with the decision data
    return Promise.resolve(decisionData);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Function to get the balance sheet and pre-assessment
const submitApplication = async (req, res) => {
  try {
    const { businessValues, data } = req.body;

    const name = businessValues.name;
    const yearEstablished = businessValues.yearEstablished;
    const accountingProvider = businessValues.accountingProvider;
    const loanAmount = businessValues.loanAmount;

    const balanceSheet = data;
    // Calculate preAssessment based on the provided data
    const preAssessment = calculatePreAssessment(balanceSheet, loanAmount);

    // Calculate the summary of profit or loss
    const summaryProfitLoss = calculateSummaryProfitLoss(balanceSheet);

    //here we will send the values to decision tree

    const decisionTreeRequestPayload = {
      business: {
        name,
        yearEstablished,
        loanAmount,
        summaryProfitLoss,
      },
      preAssessment: `${preAssessment}%`,
    };
    console.log("decisionTreeRequestPayload", decisionTreeRequestPayload);
    // Call the Decision Tree API and await the response
    const decisionTreeResponse = await callDecisionTreeAPI(
      decisionTreeRequestPayload
    );
    console.log("decisionTreeResponse", decisionTreeResponse);
    // Include the decision data in the response sent from your submitApplication controller

    res.status(200).json({
      decision: decisionTreeResponse, // Include the decision data here
    });
  } catch (error) {
    console.error("Error calculating balance sheet:", error);
    res.status(500).json({ error: "Error calculating balance sheet" });
  }
};

module.exports = { submitApplication };
