var mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required : true
    },
    city: {
        type: String,
        required : true
    },
    state: {
        type: String,
        required : true
    },
    zip: {
        type: String,
        required : true
    }
})

var userSchema = new mongoose.Schema({
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
    address : addressSchema
});

mongoose.model("User", userSchema);


