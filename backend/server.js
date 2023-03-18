const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();


app.use(cookieParser());
//declare port
const PORT = process.env.PORT || 8070;

const router = require('./routes/user-routes');

//using dependencies
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

app.use('/User', router);//router is hanlding all of the routing operations after the /User

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