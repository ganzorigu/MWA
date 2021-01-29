var mongoose = require("mongoose");
var Attendance = mongoose.model("Attendance");

module.exports.takeAttendance = function(req, res) {
    console.log("new attendance");
    var studentId = req.body.studentId;
    var currTime = new Date();
    console.log(currTime);
    var state = "NaN";    
    
    const response = {
        status: 200,

        message: "working"
    }
    
    Attendance.create({
        studentId : studentId,
        arrivedTime : currTime,
        state : state            
    }, function(err, doc){        
        if (err){
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log("attendance created", doc);
            res.status(200).json(doc);
        }
    });
                  
}