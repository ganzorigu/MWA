const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports.addressesGetAll = function(req,res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    
    Book.findOne(
        {"_id" : bookId, "authors._id" : authorId},
        function(err, obj) {
            response = {
                "status" : 200,
                "message" : obj
            }
            console.log(obj);
            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!(obj.authors.id(authorId).address)) {
                response.status = 404;
                response.message = {"message" : "bookId, authorId, dont' match"};
            } else {
                res.status(200).json(obj.authors.id(authorId).address);
            }                        
        }
    );  
}

module.exports.addressesAddOne = function(req,res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;

    let newAddress = {
        street : req.body.street,
        zipcode : parseInt(req.body.zipcode),
        city : req.body.city,
        state : req.body.state
    };


    Book.updateOne(
        {"_id" : bookId, "authors._id" : authorId},
        {
            $push : {
                "authors.$.address" : newAddress
            }
        },
        function(err, obj) {
            console.log("err:", err);
            console.log(obj);
            res.status(200).json({"message" : "added"});
        }
    )
}

module.exports.addressesGetOne = function(req,res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    const addressId = req.params.addressId;

    Book.findOne(
        {"_id" : bookId, "authors._id" : authorId},        
        function(err, obj) {
            response = {
                "status" : 200,
                "message" : obj
            }
            console.log(obj);
            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!(obj.authors.id(authorId).address)) {
                response.status = 404;
                response.message = {"message" : "bookId, authorId, dont' match"};
            } else {
                let addresses = obj.authors.id(authorId).address;
                if (!addresses.id(addressId)) {
                    response.status = 404;
                    response.message = {"message" : "bookId, authorId, dont' match"};
                } else {
                    response.message = addresses.id(addressId);
                }
                res.status(response.status).json(response.message);
            }    
        }
    )
}




