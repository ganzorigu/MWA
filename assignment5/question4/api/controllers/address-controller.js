var mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.addressesGetAll = function(req,res) {
    const studentId = req.params.studentId;
    Student.findById(studentId).select("address").exec(function(err, student){

        let response = {
            status : 200,
            data : student
        };

        if (err) {
            console.log(err);
            response.status = 500;            
            response.data = {"message" : "System Error"};
        } else if(!student) {
            response.status=404;
            response.data = {"message" : "student with ID not found"};
        }
        
        if (response.status == 200) {
            response.data = student.address;       
            // if (!game.publisher) {
            //     response.status = 404;
            //     response.data = {"message" : "There is no publisher"};
            // } else {
                
            // }
        }                

        res.status(response.status).json(response.data);
    });
};


module.exports.addressesAddOne = function(req, res){    
    let newAddress = {
        street : req.body.street,
        zipcode :  req.body.zipcode,
        city :  req.body.city,          
        country :  req.body.country
    }
    console.log("new Address: ", newAddress);
    const studentId = req.params.studentId;      
    Student.updateOne(
        {"_id":studentId},
        {
            $push: {"address" : newAddress}
        }, 
        function(err, doc) {
            let response = {
                status : 201,
                message : {"message" : "added"}
            };
            console.log("obj: ",doc);
            if(err){
                response.status = 500;
                response.message = {"message" : "System Error"};
                console.log(err);
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = {"message" : "studentId not found"};
                }
            }
            res.status(response.status).json(response.message);
        }
    );

}


// module.exports.addressesGetOne = function(req, res) {
//     const gameId = req.params.gameId; 
//     const reviewId = req.params.reviewId; 
//     Game.findOne({"_id": gameId, "reviews._id": reviewId}, function(err, obj) {
//         let response = {
//             status : 200,
//             message : obj
//         };
//         if (err) {
//             response.status = 500;
//             response.message = {"message" : "System Error"};
//             console(err);
//         } else if (!obj) {
//             response.status = 404;
//             response.message = {"message" : "ReviewId or GameId not found"};
//         } else {
//             response.status = 200;
//             response.message = obj.reviews.id(reviewId);
//         }

//         res.status(response.status).json(response.message);
//     });
// }


// module.exports.addressesUpdateOne = function(req, res) {
//     const gameId = req.params.gameId; 
//     const reviewId = req.params.reviewId; 
//     Game.updateOne(
//         {"_id":gameId, "reviews._id": reviewId},
//         {$set: {
//             "reviews.$.reviewer" : req.body.reviewer,
//             "reviews.$.reviewDate" : req.body.reviewDate,
//             "reviews.$.reviewText" : req.body.reviewText            
//         }}, function(err, doc) {
//             let response = {
//                 status : 204,
//                 message : {"message" : "updated"}
//             };
//             if(err){
//                 response.status = 500;
//                 response.message = {"message" : "System Error"};
//                 console(err);
//             } else {
//                 if (doc.nModified == 0) {
//                     response.status = 404;
//                     response.message = {"message" : "ReviewId or GameId not found"};
//                 }
//             }
//             res.status(response.status).json(response.message);
//         });    
// }


// module.exports.addressesDeleteOne = function(req,res) {
//     const gameId = req.params.gameId; 
//     const reviewId = req.params.reviewId; 
//     Game.updateOne(
//         {"_id":gameId},
//         {$pull: {"reviews": {"_id" : reviewId}}
//         },
//         function(err, doc) {
//             let response = {
//                 status : 204,
//                 message : {"message" : "deleted"}
//             };
//             if(err){
//                 response.status = 500;
//                 response.message = {"message" : "System Error"};
//                 console.log(err);
//             } else {
//                 if (doc.nModified == 0) {
//                     response.status = 404;
//                     response.message = {"message" : "ReviewId or GameId not found"};
//                 }
//             }
//             res.status(response.status).json(response.message);
//         }
//     );
// }
