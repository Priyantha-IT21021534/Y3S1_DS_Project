require('dotenv').config();// Load shared .env file using path attribute
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/products-routs");
const app = express();

//declare port
const PORT = process.env.PORT || 8070;

//using dependencies
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use("/products",router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/Product_Service?retryWrites=true&w=majority";

mongoose.connect(link, {
  useNewUrlParser: true,
	useUnifiedTopology: true
});
console.log("Connection status: ", mongoose.connection.readyState);
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB Connection Success!");
});



app.listen(PORT, () => {
	console.log(`Products Server is up and running on Port: ${PORT}`)
});