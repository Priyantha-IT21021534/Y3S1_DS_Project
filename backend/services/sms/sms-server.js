//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// using dependencies
const app = express();
require('dotenv').config();

//declare port
const PORT = process.env.PORT || 8200;

//using dependencies
app.use(cors());
app.use(bodyParser.json());

// listening on port
app.listen(PORT, () => {
	console.log(`SMS Server is up and running on Port: ${PORT}`)
});

// Declare Route
const smsRouter = require("./routes/sms-routes");
app.use("/sms",smsRouter);