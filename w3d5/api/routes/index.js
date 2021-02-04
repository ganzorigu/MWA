const router=require("express").Router();
const studentsController = require("../controllers/students-controller");
const attendanceController = require("../controllers/attendance-controller");
// const path=require("path");

// router.route("/").get(function(req,res){    
//     res.status(200).sendFile(path.join(__dirname,"..","public","index.html"));
// });

// router.route("/home").get(function(req,res){    
//     res.status(200).sendFile(path.join(__dirname,"..","public","home.html"));
// });

// router.route("/profile").get(function(req,res){    
//     res.status(200).sendFile(path.join(__dirname,"..","public","studentProfile.html"));
// });

// router.route("/faculty").get(function(req,res){    
//     res.status(200).sendFile(path.join(__dirname,"..","public","faculty.html"));
// });

// router.route("/scan").get(function(req,res){    
//     res.status(200).sendFile(path.join(__dirname,"..","public","scan.html"));
// });

router.route("/students") 
    .get(studentsController.studentsGetAll)   
    .post(studentsController.register);

router.route("/students/:studentId")
    .get(studentsController.studentsGetOne)
    .put(studentsController.studentsUpdateOne)
    .delete(studentsController.studentsDeleteOne);
    
router.route("/students/:studentId/qr")
    .get(studentsController.getQr);
    
router.route("/students/login")
    .post(studentsController.login);

router.route("/attendance")
    .post(attendanceController.takeAttendance);

module.exports=router;