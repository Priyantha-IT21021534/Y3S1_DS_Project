const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },


    mobile:{
        type:Number,
        required:true
        
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    address:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
        minlength:6
    }

})

const User = mongoose.model("User", userSchema)

module.exports = User;