// import mongoose
const mongoose = require("mongoose")

// create schema(class=>new instance) (to create structure)
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    profile : {
        type : String ,
        default : ""
    },
    bio  : {
        type : String,
        default : "BookStore User"
    },
    role : {
        type : String ,
        default : "user"
    }
})

// create model using schema
const users = mongoose.model("users" , userSchema)
module.exports = users