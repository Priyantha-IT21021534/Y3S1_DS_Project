const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const {roles}= require("./roles")

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
        enum: [roles.admin, roles.buyer, roles.seller],
        default: roles.buyer    
       }
    
})

module.exports = mongoose.model("user", userSchema)

