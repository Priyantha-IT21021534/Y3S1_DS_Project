const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();
app.use(cookieParser());
//declare port
const PORT = process.env.PORT || 8090;

const router = require('./routes/user-routes');

//using dependencies
app.use(cors());
app.use(bodyParser.json());
app.use('/User', router)
const link="mongodb+srv://DS_Project:NIsL73uZpYheSBwR@dscluster.i4dqped.mongodb.net/RoleBase?retryWrites=true&w=majority";




    const connectDatabase = async () => {
        try {
            
          await mongoose.connect(link, {useNewUrlParser:true});
      
          console.log("connected to database");
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      };
      
      connectDatabase();

      app.listen(PORT, () => {
        console.log(`Server is up and running on Port: ${PORT}`)
    });

/*
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB Connection Success!");
});

app.listen(PORT, () => {
	console.log(`Server is up and running on Port: ${PORT}`)
});

*/