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
        required:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6
    },

    role: {
        type: String,
        default: 'buyer',
        enum: ["buyer", "seller", "admin"]
       }
})

const User = mongoose.model("User", userSchema)

module.exports = User;