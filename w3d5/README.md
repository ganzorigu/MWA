# Functionality
* CRUD operation on students for attendance

## folder structure
* attendance-proj (Angular project)
* controllers (express controllers)
* route (Express router)

### Routes at backend
```
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
```