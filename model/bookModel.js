const mongoose = require("mongoose") //import mongoose

const bookSchema = new mongoose.Schema({ //create schema
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    noofPages: {
        type: Number,
        required: true
    },
    ImageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dPrice: {
        type: Number,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    uploadImages: {
        type: Array,
        required: true
    },
    userMail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    boughtby: {
        type: String,
        default: ""
    }

})

const books = mongoose.model("books", bookSchema) //create model
module.exports = books