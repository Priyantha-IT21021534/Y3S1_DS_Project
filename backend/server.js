const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//declare port
const PORT = process.env.PORT || 8070;

//using dependencies
app.use(cors());
app.use(bodyParser.json());

const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/DS_Project?retryWrites=true&w=majority";

mongoose.connect(link, {
   useNewUrlParser: true,
	useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB Connection Success!");
});

app.listen(PORT, () => {
	console.log(`Server is up and running on Port: ${PORT}`)
});