// const mongoose = require("mongoose");
// const Student = mongoose.model("Student");

// module.exports.studentsGetAll = function(req, res){
//     console.log("student get all");
//     Student.find().exec(function(err, students){
//         console.log("Found students", students.length);
//         res.status(200).json(students);
//     });
// };

// module.exports.studentsGetOne = function(req, res){
//     const studentId = req.params.studentId;
//     console.log("student get one");
//     Student.find({"studentId" : studentId}).exec(function(err, student){
//         let response = {
//             "status" : 200,
//             "data" : student
//         }
//         console.log(student);
//         if (err) {
//             response.status = 500;
//             response.data = "System error";
//         } else if (student.length==0) {
//             response.status = 404;
//             response.data = "Student with id:"+studentId+" not found";
//         }
//         console.log("Found student with id:", studentId);
//         res.status(response.status).json(response.data);
//     });
// };

// module.exports.studentsAddressGetAll = function(req, res) {
//     const studentId = req.params.studentId;
//     console.log("student address all");
//     Student.find({"studentId" : studentId}).select("address").exec(function(err, addresses){
//         let response = {
//             "status" : 200,
//             "data" : addresses
//         }
//         console.log(addresses);
//         if (err) {
//             response.status = 500;
//             response.data = "System error";
//         } else if (addresses == null || addresses.length==0) {
//             response.status = 404;
//             response.data = "Student with id:"+studentId+" not found";
//         }        
//         res.status(response.status).json(response.data);
//     });
// };

// module.exports.studentsAddressGetOne = function(req, res) {
//     const studentId = req.params.studentId;    
//     const addressId = parseInt(req.params.addressId);
//     console.log("student address get one");
//     console.log("address id:" , addressId);
//     Student.findOne({"studentId" : studentId}).select("address").exec(function(err, addresses){        
//         let response = {
//             "status" : 200,
//             "data" : addresses
//         }        
//         console.log( addresses);        

//         if (err) {
//             response.status = 500;
//             response.data = "System error";
//         } else if (addresses==null || addresses.length==0) {
//             response.status = 404;
//             response.data = "Student with id:"+studentId+" not found";
//         } else if (isNaN(addressId)) {
//             response.status = 500;
//             response.data = "address id should be number";
//         }
//         else if (addressId >= addresses.address.length) {
//             response.status = 404;
//             response.data = "Student with id:"+studentId+" has no address at id:"+addressId;
//         }
//         else {
//             response.data = addresses.address[addressId];
//         }
        
//         res.status(response.status).json(response.data);
//     });
// };



/////////////*********************************** */

const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.studentsGetAll = function(req, res) {    

    // Using Mongoose
    Student.find().exec(function(err, students){
        if (err) {
            res.status(500).json({"message" : "System error"});    
            return;
        } 
        console.log("Found games ", students);
        res.status(200).json(students);
    })

}

module.exports.studentsGetOne = function(req, res) {
    const studentId = req.params.studentId;    
    console.log("Get student with studentId: ", studentId);

    Student.findById(studentId).exec(function(err, student){
        let response = {
            status : 200,
            message : student
        };

        if (err) {
            console.log(err);
            response.status = 500;            
            response.message = {"message" : "System Error"};
        } else if(!student) {
            response.status=404;
            response.message = {"message" : "Student with ID not found"};
        }
        res.status(response.status).json(response.message);            
    })    
};

module.exports.studentsAddOne = function(req, res){
    console.log("request body:")
    console.log(req.body);
    if (req.body && req.body.name && req.body.gpa) {        
        Student.create({
            name: req.body.name,
            gpa: parseFloat(req.body.gpa),            
            address: [],                        
        }, function(err, student){
            const response = {
                status: 201,
                message: student
            }
            if(err) {
                response.status = 400;
                response.message = {"message" : "System Error"};
            }
            res.status(response.status).json(response.message);
        });
    } else {
        console.log("Data is missing from body");
        res.status(400).json({"message" : "Data is missing from body"});
    }
}

module.exports.studentsUpdateOne = function(req, res) {
    const studentId = req.params.studentId;

    Student.findById(studentId).select("-reviews -publisher").exec(function(err,student){
        const response = {
            status: 204,
            message: student
        }
        if(err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
        } else if (!student){
            response.status = 404;
            response.message = {"message" : "Student Id not found"};
        }
        
        if (response.status != 204) {
            // something went wrong
            res.status(response.status).json(response.message);
        } else {
            // we got the game, need to update
            student.name = req.body.name;           
            student.gpa = parseFloat(req.body.gpa);            
            student.save(function(err, updatedStudent){
                response.message = updatedStudent;                
                if (err){
                    response.status = 500;
                    response.message = {"message" : "System Error"};
                }
                console.log("successfully updated");
                res.status(response.status).json(response.message);
            })         
        }
    });
}


module.exports.studentsDeleteOne = function(req, res) {
    const studentId = req.params.studentId;

    Student.findByIdAndRemove(studentId).exec(function(err,deletedStudent){
        const response = {
            status: 204,
            message: deletedStudent
        }
        if(err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
        } else if (!deletedStudent){
            response.status = 404;
            response.message = {"message" : "Student Id not found"} ;
        }
        
        res.status(response.status).json(response.message);        
    });
}