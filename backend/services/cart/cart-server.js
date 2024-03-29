require('dotenv').config();// Load shared .env file using path attribute
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./cart-routes/cart-routes");
const app = express();

//declare port
const PORT = process.env.PORT || 8050;

//using dependencies
app.use(cors());
app.use(bodyParser.json());
app.use("/Cart",router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/Cart?retryWrites=true&w=majority";

mongoose.connect(link)
	.then(()=>console.log("Connected to DataBase"))
    .then(() =>{
        app.listen(PORT)
    }).catch((err)=>console.log(err));
