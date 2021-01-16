const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: {
        type : String
        //required: true
    },
    zipcode: {
        type : String
        //required: true
    },
    city: {
        type : String
        //required : true
    },
    country: {
        type : String
        //required : true
    }
    
});


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    gpa: { type: Number, min: 1.0, max: 4.0, required: true},
    //studentId: { type: String, required: true},
    address : {type: [addressSchema]}
});

var Student = mongoose.model("Student", studentSchema, "Students"); // collection in StudentDB is Students

