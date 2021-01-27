const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    street : {
        type: String,
        required: true
    },
    zipcode : {
        type: Number,
        min: 10000,
        max: 99999,
        required: true        
    },
    city : {
        type: String,
        required: true        
    },
    state : {
        type: String,
        required: true        
    }
});

const authorSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    address: [addressSchema]
});

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    isbn : {
        type: String,        
        required: true
    },
    checkOutDays : {
        type: Number,
        required: true
    },
    authors : [authorSchema]
});

mongoose.model("Book", bookSchema, "books"); //collection in the db;