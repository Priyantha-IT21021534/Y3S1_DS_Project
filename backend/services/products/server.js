const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/products-routs");
const app = express();

//declare port
const PORT = process.env.PORT || 8082;

//using dependencies
app.use(cors());
app.use(bodyParser.json());
app.use("/products",router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/Product_Service?retryWrites=true&w=majority";

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