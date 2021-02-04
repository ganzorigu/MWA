## extra modules at the frontend
```
npm install xlsx
npm install angularx-qrcode
```

## used modules at the backend so far
```    
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.11.14",
    "qrcode": "^1.4.4"
```

*Note: qrcode is generated and stored in database when new student is registered by faculty.*

```
qrcode = studentId+secretKey
```
* after parsing studentId from qrCode image. system will take attendance based on the current system tim.


### Routes at backend used so far
```
router.route("/students")    
    .post(studentsController.register);

router.route("/students/:studentId")
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