I thought of creating a video reference of project for extra clarity.
So I am attaching it right here.
https://drive.google.com/file/d/1b4y8yH03yEZKDtVeUxKPUrp32tLNcNZ_/view?usp=drive_link

# DemystLoanApp
The goal of the project is to build a simple business loan application system.

The system consists of the following:

Frontend
Backend
The backend would integrate with third-party providers such as:

Decision engine - This is where the final application will be submitted to present the outcome of the application.
Accounting software providers will provide a balance sheet for a selected business of the user.

sequenceDiagram
  Actor User as User
  participant FE as Frontend
  participant BE as Backend
  participant ASP as Accounting Software
  participant DE as Decision Engine

  User ->> FE: Start Application

  FE ->> BE: Initiate Application
  BE ->> FE: Initiate Complete

  User ->> FE: Fill Business Details & Loan amount
  User ->> FE: Select Accounting provider
  User ->> FE: Request Balance Sheet
  FE ->> BE: Fetch Balance Sheet
  BE ->> ASP: Request Balance Sheet
  ASP ->> BE: Return Balance Sheet
  BE ->> FE: Return Details for Review

  User --> FE: Review Complete
  User ->> FE: Submit Application

  FE ->> BE: Request outcome
  BE ->> BE: Apply Rules to summarise application
  BE ->> DE: Request Decision
  DE ->> BE: Returns outcome

  BE ->> FE: Application Result
  FE ->> User: Final Outcome



FE=FRONTEND
BE=BACKEND
ASP=ACCOUNTING SOFTWARE PROVIDER
DE=DECISION ENGINE

The accounting software and decision engine are already implemented. The backend should provide a simulation of the above.
The frontend can be very basic.
The accounting provider option on frontend would include Xero, MYOB and more in future.
A sample balance sheet received from Accounting provider:


sheet = [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
]

Rules to be applied before sending to Decision Engine
If a business has made a profit in the last 12 months. The final value to be sent with a field "preAssessment": "60" which means the Loan is favored to be approved 60% of the requested value. If the average asset value across 12 months is greater than the loan amount then "preAssessment": "100"
Default value to be used 20
The Final output to be sent to the decision engine would contain minimum details such as
Business Details such as:
Name
Year established
Summary of Profit or loss by the year
preAssessment value as per the rules



