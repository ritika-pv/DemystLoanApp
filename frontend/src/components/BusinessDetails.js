import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppInfoContext } from "../context";
import "./BusinessDetails.css";

const BusinessDetails = () => {
  const [getID, setID] = useState(null);
  useEffect(() => {
    // Inside the useEffect, make the POST request with an empty object as the request body
    axios
      .post("http://localhost:4000/api/initiate-application", {}) // Pass an empty object as the request body
      .then((response) => {
        setID(response.data.objectId);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    ein: Yup.number().required("EIN is required"),
    contact: Yup.number().required("Contact Number is required"),
    yearEstablished: Yup.number().required("Year established is required"),
    accountingProvider: Yup.string().required(
      "Accounting provider is required"
    ),
    loanAmount: Yup.number().required("Loan amount is required"),
  });

  // Define the list of years from 2023 to 2001
  const years = Array.from({ length: 23 }, (_, index) => 2023 - index);

  // Initial form values
  const initialValues = {
    name: "",
    ein: "",
    contact: "",
    yearEstablished: "",
    accountingProvider: "",
    loanAmount: "",
  };
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Make an Axios POST request
    axios
      .post("http://localhost:4000/api/balance-sheet", values)
      .then((response) => {
        // Use the navigate function to redirect to /balance-sheet and pass the data
        navigate("/balance-sheet", {
          state: { data: response.data.balanceSheet, values: values },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const { Provider } = AppInfoContext;
  return (
    <Provider value={{ id: 23 }}>
      <div className="business-details-heading ">
        ID: {getID}
        <h2>Enter your business details</h2>
      </div>
      <div className="business-details-container">
        <div className="business-details-image">
          <img src="images/business_profile.png" alt="Your Image" />
          <div>
            <h4>Sample Test Cases </h4>
            <table className="sampleTT" border="1">
              <tr>
                <th>Summary Profit/Loss</th>
                <th>Average Assets Value</th>
                <th>Accounting Provider</th>
                <th>Loan Amount</th>
              </tr>
              <tr>
                <td id="summaryProfitLoss1">&lt; 0</td>
                <td id="avgAssetsValue1">&gt; loanAmount</td>
                <td id="accountingProvider1">myob</td>
                <td id="loanAmount1">30000</td>
              </tr>
              <tr>
                <td id="summaryProfitLoss2">&lt; 0</td>
                <td id="avgAssetsValue2">&lt; loanAmount</td>
                <td id="accountingProvider2">myob</td>
                <td id="loanAmount2">70000</td>
              </tr>
              <tr>
                <td id="summaryProfitLoss3">&gt; 0</td>
                <td id="avgAssetsValue3">&gt; loanAmount</td>
                <td id="accountingProvider3">xero</td>
                <td id="loanAmount3">30000</td>
              </tr>
              <tr>
                <td id="summaryProfitLoss4">&gt; 0</td>
                <td id="avgAssetsValue4">&lt; loanAmount</td>
                <td id="accountingProvider4">xero</td>
                <td id="loanAmount4">70000</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="business-details-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-field">
                <label htmlFor="ein">Employer Identification Number</label>
                <Field type="number" id="ein" name="ein" />

                <ErrorMessage name="ein" component="div" className="error" />
              </div>

              <div className="form-field">
                <label htmlFor="contact">Contact Number</label>
                <Field type="text" id="contact" name="contact" />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label htmlFor="yearEstablished">Year Established</label>
                <Field as="select" id="yearEstablished" name="yearEstablished">
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="yearEstablished"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label>Accounting Provider</label>
                <div>
                  <label>
                    <Field
                      type="radio"
                      name="accountingProvider"
                      value="xero"
                    />
                    Xero
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="accountingProvider"
                      value="myob"
                    />
                    MYOB
                  </label>
                </div>
                <ErrorMessage
                  name="accountingProvider"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label htmlFor="loanAmount">Loan Amount</label>
                <Field type="number" id="loanAmount" name="loanAmount" />
                <ErrorMessage
                  name="loanAmount"
                  component="div"
                  className="error"
                />
              </div>

              <button className="submit-button" type="submit">
                Balance Sheet
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Provider>
  );
};

export default BusinessDetails;
