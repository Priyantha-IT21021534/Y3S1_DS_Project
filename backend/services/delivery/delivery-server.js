//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require('dotenv').config();

//declare port
const PORT = process.env.PORT || 8300;

//using dependencies
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`Delivery Server is up and running on Port: ${PORT}`)
});

// Declare Route
const deliveryRouter = require("./routes/delivery-routes");
app.use("/delivery", deliveryRouter);