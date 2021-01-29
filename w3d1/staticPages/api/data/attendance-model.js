var mongoose = require("mongoose");

// assuming that there is one class which starts at 10:00am.
// otherwise faculty should create schedule for each day for block.
var attendanceSchema = new mongoose.Schema({
    studentId: String,
    arrivedTime: Date,
    state : String    
});

mongoose.model("Attendance", attendanceSchema, "Attendances");