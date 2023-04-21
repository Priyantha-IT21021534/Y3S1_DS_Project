require('dotenv').config({ path: '../shared/.env' });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./order-route/order-route");
const app = express();

//declare port
const PORT = process.env.PORT || 8020;

//using dependencies
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(bodyParser.json());
app.use("/Order",router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/Order?retryWrites=true&w=majority";

mongoose.connect(link)
	.then(()=>console.log("Connected to DataBase"))
    .then(() =>{
        app.listen(PORT)
    }).catch((err)=>console.log(err));
