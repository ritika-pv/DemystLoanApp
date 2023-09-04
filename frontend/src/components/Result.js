import React from "react";
import "./Result.css"; // Import your CSS for styling

import { useLocation } from "react-router-dom";
const Result = () => {
  const location = useLocation();
  const status = location.state.status;
  const amount = location.state.amount;

  const isApproved = status;
  const imageSource = isApproved
    ? "images/approved.png"
    : "images/disapproved.png";

  return (
    <div className="result-container">
      <div className="result-image">
        <img src={imageSource} alt="Your Image" />
      </div>
      <div className="result-box">
        <h2>Loan Approval Result</h2>
        {isApproved ? (
          <>
            <p>Status: Approved</p>

            <p>Approved Amount: ${amount}</p>
          </>
        ) : (
          <p>Status: Disapproved</p>
        )}
      </div>
    </div>
  );
};

export default Result;
