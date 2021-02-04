var mongoose = require("mongoose");
var Attendance = mongoose.model("Attendance");

module.exports.getAttendance = function(req,res) {
  Attendance.find().exec(function (err, jobs) {
    const response = {
      status: 200,
      message: jobs
    }
    if (err) {
      response.status = 500;
      response.message = { "message": "System error" };
    } else if (!jobs) {
      response.status = 404;
      response.message = { "message": "No Jobs found" };
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.searchStudentId = function(req,res) {
  const searchId = req.query.id;
  
  var search = {};
  if (searchId) {
      let re = new RegExp(searchId, 'i')
      search = {"studentId": re}
  }

  Attendance.find(search, function(err,result) {
      const response = {
          status: 200,
          message: result
      }
      if(err) {
          response.status = 500;
          response.message = {"message" : "System Error"};
      } else if (!result){
          response.status = 404;
          response.message = {"message" : "Book with title not found"} ;
      } else if(result) {
          if (result.length==0) {
              response.status = 404;
              response.message = {"message" : "Book with title not found"} ;
          }
      }             
      res.status(response.status).json(response.message);         
  });
  
}



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