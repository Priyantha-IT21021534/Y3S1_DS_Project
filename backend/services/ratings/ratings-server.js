require('dotenv').config();// Load shared .env file using path attribute
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/review-routes");
const app = express();

//declare port
const PORT = process.env.PORT || 8079;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(bodyParser.json());
app.use("/review",router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/Review&Rate?retryWrites=true&w=majority";

mongoose.connect(link, {
   useNewUrlParser: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB Connection Success!");
});

app.listen(PORT, () => {
	console.log(`Ratings Server is up and running on Port: ${PORT}`)
});