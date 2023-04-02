//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//declare port
const PORT = process.env.PORT || 8100;

//using dependencies
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`Email Server is up and running on Port: ${PORT}`)
});

// Declare Route
const emailRouter = require("./routes/email-routes");
app.use("/email",emailRouter);