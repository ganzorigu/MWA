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
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : true
    },
    studentId: {
        type: String,
        required : true
    },
    qrCode: {
        type: String,
        required : true        
    }
});

mongoose.model("Student", studentSchema);


