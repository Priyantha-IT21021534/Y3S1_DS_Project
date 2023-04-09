require('dotenv').config({ path: '../shared/.env' });// Load shared .env file using path attribute

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//declare port
const PORT = process.env.PORT || 8090;

const router = require('./routes/user-routes');

//using dependencies
app.use(cors());
app.use(bodyParser.json());
app.use('/User', router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/RoleBase?retryWrites=true&w=majority";




mongoose.connect(link)
.then(()=>console.log("Connected to DataBase"))
.then(() =>{
    app.listen(PORT)
}).catch((err)=>console.log(err));