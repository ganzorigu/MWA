const mongoose = require("mongoose");
const Book = mongoose.model("Book");

module.exports.booksGetAll = function(req,res) {    
    Book.find().exec(function(err, books) {
        console.log("all Books:", books);
        if (err) {
            res.status(500).json({"message": "System error"});
        } else {
            if (books.length != 0) {
                res.status(200).json(books);
            } else {
                res.status(404).json({"message": "no books"});
            }
        }        
    });
}

module.exports.booksGetOne = function(req,res) {    
    const bookId = req.params.bookId;
    console.log("book id:", bookId);
    Book.findById(bookId).exec(function(err, book) {
        console.log("One book: ", book);
        if (err) {
            res.status(500).json({"message": "System error"});
        } else {
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({"message": "book with Id not found"});
            }
        }        
    });
}

module.exports.booksUpdateOne = function(req,res) {    
    const bookId = req.params.bookId;

    let checkOutDays = parseInt(req.body.checkOutDays);    
    if (isNaN(checkOutDays)) {
        res.status(501).json({"message" : "parameter type not supported"});
        return;
    }    
    Book.updateOne({"_id" : bookId}, 
        {
            $set: {
                "title" : req.body.title,
                "isbn" : req.body.isbn,
                "checkOutDays" : req.body.checkOutDays
            }
        },         
        function(err, doc){
            let response = {
                status : 204,
                message : {"message" : "updated"}
            };
            console.log(doc);
            if(err){
                response.status = 500;
                response.message = {"message" : "System Error"};
                console.log(err);
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = {"message" : "bookId not found"};
                }
            }
            res.status(response.status).json(response.message);
        });
}

module.exports.booksAddOne = function(req,res) {
    console.log("request body");
    console.log(req.body);
    if (req.body && req.body.title && req.body.isbn && req.body.checkOutDays) {
        console.log("data is here");
        let checkoutDays = parseInt(req.body.checkOutDays);
        if (isNaN(checkoutDays)) {
            res.status(400).json({"message": "checkout should be number"});
            return;
        }
        Book.create({
            title: req.body.title,
            isbn: req.body.isbn,
            checkOutDays : checkoutDays,
            authors: []
        }, function(err, book){
            const response = {
                "status" : 201,
                "message" : book
            };

            if (err) {
                response.status = 500;
                response.message = {"message" : "System error"};
            } 
            res.status(response.status).json(book);
        });

    } else {
        res.status(400).json({"message": "Data is missing in the body"});
    }    
}

module.exports.booksDeleteOne = function(req, res) {
    const bookId = req.params.bookId;

    Book.findByIdAndRemove(bookId).exec(function(err,deletedBook){
        const response = {
            status: 204,
            message: deletedBook
        }
        if(err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
        } else if (!deletedBook){
            response.status = 404;
            response.message = {"message" : "Book Id not found"} ;
        }
        
        res.status(response.status).json(response.message);        
    });
}


module.exports.searchBookCnt = function(req,res) {
    const bookTitle = req.query.title;

    var search = {};
    if (bookTitle) {
        let re = new RegExp(bookTitle, 'i')
        search = {"title": re}
    }

    Book.countDocuments(search, function(err,cnt){
        const response = {
            status: 200,
            message: cnt
        }
        if(err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
        } else if (!cnt){
            response.status = 404;
            response.message = {"message" : "Book with title not found"} ;
        } else {
            response.message = Math.ceil(cnt/5);            
        }             
        res.status(response.status).json(response.message); 
    })

}

module.exports.searchBook = function(req,res) {
    const bookTitle = req.query.title;
    var count = 5;
    var offset = 0;
    var page = 0;
    // if (req.query && req.query.count) {
    //     count = parseInt(req.query.count);        
    // };

    if (req.query && req.query.page) {
        page = parseInt(req.query.page);         
    }
    offset = page * count;
    
    var search = {};
    if (bookTitle) {
        let re = new RegExp(bookTitle, 'i')
        search = {"title": re}
    }
    // Game.find(search, null, {limit: count, skip:offset}).then(function(result){
    //     if(result) {
    //         if (result.length==0) {
    //             response.status = 404;
    //             response.message = {"message" : "Game with title not found"} ;
    //         }
    //     }             
    //     res.status(response.status).json(response.message); 
    // }).catch(next);

    Book.find(search, function(err,result) {
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
    }).skip(offset).limit(count);
    
}