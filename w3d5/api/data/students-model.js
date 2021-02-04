var mongoose = require("mongoose");

// students information is stored here.
// There is only one faculty user which is hardcoded.
// var addressSchema = new mongoose.Schema({
//     street: {
//         type: String,
//         required : true
//     },
//     city: {
//         type: String,
//         required : true
//     },
//     state: {
//         type: String,
//         required : true
//     },
//     zip: {
//         type: String,
//         required : true
//     }
// })

var studentSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password: {
        type : String,
        required: true
    },
    firstname: {
        type: String,
        required : true
    },
    lastname: {
        type: String,
        required : true
    },
    studentId: {
        type: String,
        required : true
    },
    secretKey: {
        type: String,
        required : true        
    }
});

mongoose.model("Student", studentSchema);


