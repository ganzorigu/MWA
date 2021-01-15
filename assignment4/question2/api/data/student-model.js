const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    gpa: { type: Number, min: 1.0, max: 4.0, required: true},
    studentId: { type: String, required: true},
    address : {type: [String]}
});

var Student = mongoose.model("Student", studentSchema, "Students"); // collection in StudentDB is Students

