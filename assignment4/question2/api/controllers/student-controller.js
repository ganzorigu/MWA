const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentGetAll = function(req, res){
    console.log("student get all");
    Student.find().exec(function(err, students){
        console.log("Found students", students.length);
        res.status(200).json(students);
    });
};

module.exports.studentGetOne = function(req, res){
    const studentId = req.params.studentId;
    console.log("student get one");
    Student.find({"studentId" : studentId}).exec(function(err, student){
        let response = {
            "status" : 200,
            "data" : student
        }
        console.log(student);
        if (err) {
            response.status = 500;
            response.data = "System error";
        } else if (student.length==0) {
            response.status = 404;
            response.data = "Student with id:"+studentId+" not found";
        }
        console.log("Found student with id:", studentId);
        res.status(response.status).json(response.data);
    });
};

module.exports.studentAddressGetAll = function(req, res) {
    const studentId = req.params.studentId;
    console.log("student address all");
    Student.find({"studentId" : studentId}).select("address").exec(function(err, addresses){
        let response = {
            "status" : 200,
            "data" : addresses
        }
        console.log(addresses);
        if (err) {
            response.status = 500;
            response.data = "System error";
        } else if (addresses == null || addresses.length==0) {
            response.status = 404;
            response.data = "Student with id:"+studentId+" not found";
        }        
        res.status(response.status).json(response.data);
    });
};

module.exports.studentAddressGetOne = function(req, res) {
    const studentId = req.params.studentId;    
    const addressId = parseInt(req.params.addressId);
    console.log("student address get one");
    console.log("address id:" , addressId);
    Student.findOne({"studentId" : studentId}).select("address").exec(function(err, addresses){        
        let response = {
            "status" : 200,
            "data" : addresses
        }        
        console.log( addresses);        

        if (err) {
            response.status = 500;
            response.data = "System error";
        } else if (addresses==null || addresses.length==0) {
            response.status = 404;
            response.data = "Student with id:"+studentId+" not found";
        } else if (isNaN(addressId)) {
            response.status = 500;
            response.data = "address id should be number";
        }
        else if (addressId >= addresses.address.length) {
            response.status = 404;
            response.data = "Student with id:"+studentId+" has no address at id:"+addressId;
        }
        else {
            response.data = addresses.address[addressId];
        }
        
        res.status(response.status).json(response.data);
    });
};

