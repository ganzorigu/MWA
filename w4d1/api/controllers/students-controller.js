var mongoose = require("mongoose");
var Student = mongoose.model("Student");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var QRCode = require("qrcode");

module.exports.studentsGetAll = function (req, res) {
  Student.find().exec(function (err, jobs) {
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

module.exports.register = function (req, res) {
  console.log("registerUser");
  var username = req.body.username;
  var firstname = req.body.firstname;
  console.log("firstname", firstname);
  var lastname = req.body.lastname;
  var studentId = req.body.studentId;
  var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  var secretKey = req.body.secretKey;
  // const secretKey = "secret";
  // let qrText = studentId + secretKey;

  Student.create({
    username: username,
    firstname: firstname,
    lastname: lastname,
    password: password,
    studentId: studentId,
    secretKey: secretKey
  }, function (err, student) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log("User created",student);
      res.status(200).json(student);
    }
  });


  // QRCode.toDataURL(qrText, function (err, generatedQr) {
  //     const response = {
  //         status: 200,
  //         message: "working"
  //     }
  //     if (err) {
  //         response.status = 500;
  //         response.message = {"message" : "qr code gen error"};
  //         res.status(response.status).json(response.message);
  //     } else {
  //         Student.create({
  //             username : username,
  //             firstname : firstname,
  //             lastname : lastname,
  //             password : password,
  //             studentId : studentId,
  //             qrCode : generatedQr
  //         }, function(err, student){        
  //             if (err){
  //                 console.log(err);
  //                 res.status(400).json(err);
  //             } else {
  //                 console.log("User created". student);
  //                 res.status(200).json(student);
  //             }
  //         });
  //     }        
  // });    
}


module.exports.studentsUpdateOne = function (req, res) {
  const searchStudentId = req.params.studentId;

  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var studentId = req.body.studentId;
  var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  const secretKey = "secret";
  let qrText = studentId + secretKey;

  QRCode.toDataURL(qrText, function (err, generatedQr) {
    const response = {
      status: 200,
      message: "working"
    }
    if (err) {
      response.status = 500;
      response.message = { "message": "qr code gen error" };
      res.status(response.status).json(response.message);
    } else {

      Student.updateOne({ "studentId": searchStudentId },
        {
          $set: {
            username: username,
            firstname: firstname,
            lastname: lastname,
            password: password,
            studentId: studentId,
            qrCode: generatedQr
          }
        },
        function (err, doc) {
          let response = {
            status: 204,
            message: { "message": "updated" }
          };
          console.log(doc);
          if (err) {
            response.status = 500;
            response.message = { "message": "System Error" };
            console.log(err);
          } else {
            if (doc.nModified == 0) {
              response.status = 404;
              response.message = { "message": "studentId not found" };
            }
          }
          res.status(response.status).json(response.message);
        });
    }
  });
}

module.exports.studentsGetOne = function(req,res) {
  const studentId = req.params.studentId;
  Student.findOne({ "studentId": studentId }, function (err, doc) {
    let response = {
      status: 200,
      message: doc
    };
    console.log(doc);
    if (err) {
      response.status = 500;
      response.message = { "message": "System Error" };
      console.log(err);
    } else {
      if (doc.nModified == 0) {
        response.status = 404;
        response.message = { "message": "studentId not found" };
      }
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.studentsDeleteOne = function (req, res) {
  const studentId = req.params.studentId;
  Student.deleteOne({ "studentId": studentId }, function (err, doc) {
    let response = {
      status: 204,
      message: { "message": "updated" }
    };
    console.log(doc);
    if (err) {
      response.status = 500;
      response.message = { "message": "System Error" };
      console.log(err);
    } else {
      if (doc.nModified == 0) {
        response.status = 404;
        response.message = { "message": "studentId not found" };
      }
    }
    res.status(response.status).json(response.message);
  })
}





module.exports.getQr = function (req, res) {
  var studentId = req.params.studentId;
  console.log("get qr");
  if (studentId) {
    Student.find({ "studentId": studentId }, function (err, result) {
      const response = {
        status: 200,
        message: result
      }
      if (err) {
        response.status = 500;
        response.message = { "message": "System Error" };
      } else if (!result) {
        response.status = 404;
        response.message = { "message": "student with id not found" };
      } else if (result) {
        if (result.length == 0) {
          response.status = 404;
          response.message = { "message": "student with id not found" };
        }
      }
      res.status(response.status).json(response.message);
    });
  }
}


module.exports.login = function (req, res) {
  console.log("")
  var username = req.body.username;
  var password = req.body.password;
  Student.findOne({
    username: username
  }).exec(function (err, student) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    };
    if (student && bcrypt.compareSync(password, student.password)) {
      console.log(student);
      var token = jwt.sign({ name: student.studentId }, "CS572", { expiresIn: 3600 });
      res.status(200).json({ success: true, token: token });
    } else {
      console.log("Student not found", student);
      res.status(400).json("Unauthorized");
    }
  });
};

module.exports.authenticate = function (req, res, next) {
  var headerExists = req.headers.authorization;
  if (headerExists) {
    var token = req.headers.authorization.split(" ")[1];
    console.log("Header Authorization:", req.headers.authorization);
    jwt.verify(token, "CS572", function (err, decoded) {
      if (err) {
        console.log(err);
        res.status(404).json({ "message": "unauthorized" });
      } else {
        req.user = decoded.user;
        next();
      }

    });
  } else {
    res.status(403).json("No token provided.");
  }
}