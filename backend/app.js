const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const cors = require('cors'); // Import the cors package
app.use(express.json());
const applicationRoutes=require("./routes/applicationRoutes")
const balanceSheetRoutes = require('./routes/balanceSheetRoutes');
const submitAppRoutes=require('./routes/submitAppRoutes')
const axios=require('axios');





// Allow requests from frontend domain (http://localhost:3000 in this case)
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions)); // Enable CORS for your app
//Route imports

// Use the initiate application routes
app.use('/api', applicationRoutes);

// Use the balance sheet route
app.use('/api', balanceSheetRoutes);

//Use the submit Application Routes
app.use('/api',submitAppRoutes)







module.exports = app;