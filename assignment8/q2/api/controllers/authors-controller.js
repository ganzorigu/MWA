const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports.authorsGetAll = function(req,res) {
    const bookId = req.params.bookId;

    Book.findById(bookId).exec(function(err, book){
        let response = {
            "status" : 200,
            "message" : book
        };

        if (err) {
            response.status = 500;
            response.message = {"message" : "System error"};
        } else if(!book) {
            response.status = 404;
            response.message = {"message" : "book Id not found"};
        } else {
            response.message = book.authors;
        }
        
        res.status(response.status).json(response.message);
    });
}

module.exports.authorsAddOne = function(req,res) {
    const bookId = req.params.bookId;

    const newAuthor = {
        "firstName" : req.body.firstName,
        "lastName": req.body.lastName,
        "address" : []
    }

    Book.updateOne(
        {"_id" : bookId},
        {
            $push : {
                "authors" : newAuthor
            }
        }, function(err, doc) {
            const response = {
                "status" : 201,
                "message" : "added author"
            }
            if (err) {
                response.status = 500;
                response.message = {"message" : "System Error"};
            } else {
                if (doc.nModified != 1) {
                    response.status =400;
                    response.message = {"message" : "not added"};
                }
                console.log(doc);
            }
            res.status(response.status).json(response.message);
        }
    )
}

module.exports.authorsUpdateOne = function(req,res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;

    const updatedAuthor = {
        "firstName" : req.body.firstName,
        "lastName": req.body.lastName,
        "address" : []
    }

    Book.updateOne(
        {"_id" : bookId, "author._id" : authorId},
        {
            $set : {
                "authors.$.firstName" : updatedAuthor.firstName,
                "authors.$.lastName" : updatedAuthor.lastName
            }            
        },
        function(err, obj) {
            const response = {
                "status" : 201,
                "message" : obj
            }
            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!obj) {
                response.status = 404;
                response.message = {"message" : "BookId or Author ID not found"};
            } else {

                if (obj.nModified != 1){
                    response.status = 400;
                    response.message = {"message" : "couldn't update"};
                } else {
                    response.message = updatedAuthor;
                }                
            }
            res.status(response.status).json(response.message);
        }
    )
}

module.exports.authorsDeleteOne = function(req,res) {
    const bookId = req.params.bookId;
    const authorId =req.params.authorId;
    Book.updateOne(
        {"_id" : bookId},
        {
            $pull : {authors : {"_id" : authorId}}
        },
        function(err, obj) {
            const response = {
                "status" : 204,
                "message" : obj
            }
            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!obj) {
                response.status = 404;
                response.message = {"message" : "BookId or Author ID not found"};
            } else {
                if (obj.nModified != 1){
                    response.status = 400;
                    response.message = {"message" : "couldn't delete"};
                } else {
                    response.message = {"message" : "deleted"};
                }                
            }
            res.status(response.status).json(response.message);
        }
    )

}

module.exports.authorsGetOne = function(req,res) {
    const bookId = req.params.bookId;
    const authorId = req.params.authorId;
    console.log("get one");
    Book.findOne(
        {"_id" : bookId, "authors._id" : authorId}, function(err, obj) {
            const response = {
                "status" : 200,
                "message" : obj
            }
            console.log(obj);
            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"};
            } else if (!obj) {
                response.status = 404;
                response.message = {"message" : "BookId or Author ID not found"};
            } else {
                response.message = obj.authors.id(authorId);
            }
            res.status(response.status).json(response.message);
        }
    );    

}