import React, { useState, useContext } from "react";
import "./BalanceSheet.css";
import axios from "axios";
import { AppInfoContext } from "../context";
import { useLocation, useNavigate } from "react-router-dom";

function BalanceSheet() {
  const appInfo = useContext(AppInfoContext);
  const location = useLocation();
  const data = location.state.data;
  const businessValues = location.state.values;

  // State for sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Function to handle sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      // If clicking on the same column, reset sorting
      setSortColumn(null);
    } else {
      // If clicking on a different column, set the new sorting column
      setSortColumn(column);
    }
    setIsSorted(true); // Set isSorted to true when sorting is applied
  };

  // Function to reset sorting to the default
  const resetSorting = () => {
    setSortColumn(null);
    setIsSorted(false);
  };

  // Sorting function
  const sortedData = data.slice().sort((a, b) => {
    if (sortColumn) {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];
      return columnA - columnB;
    }
    return 0;
  });
  //a and b are two objects of the data
  //if valueA>valueB positive value..... valueB should come before valueA
  ////if valueA<valueB negative value..... valueA should come before valueB

  //equal  then value =0  order doesn't matters
  //also if null is passed then also order doesn't matters return the array as it is.

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/api/submit-application", {
        businessValues,
        data,
      })
      .then((response) => {
        console.log("response.data", response.data.decision);
        const decision = response.data.decision;
        console.log(decision);

        navigate("/result", {
          state: { status: decision.status, amount: decision.amount },
        });
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  return (
    <div>
      {/* Sorting buttons */}
      <div className="sort-buttons">
        <button
          onClick={() => handleSort("year")}
          className={sortColumn === "year" ? "active" : ""}
        >
          Sort by Year
        </button>
        <button
          onClick={() => handleSort("month")}
          className={sortColumn === "month" ? "active" : ""}
        >
          Sort by Month
        </button>
        <button
          onClick={() => handleSort("profitOrLoss")}
          className={sortColumn === "profitOrLoss" ? "active" : ""}
        >
          Sort by Profit/Loss
        </button>
        <button
          onClick={() => handleSort("assetsValue")}
          className={sortColumn === "assetsValue" ? "active" : ""}
        >
          Sort by Assets Value
        </button>
        <button onClick={resetSorting}>Reset Sorting</button>
      </div>

      {/* Table */}
      <table className="basic-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Profit or Loss</th>
            <th>Assets Value</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.month}</td>
              <td>{item.profitOrLoss}</td>
              <td>{item.assetsValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit Application
        </button>
      </div>
    </div>
  );
}

export default BalanceSheet;
