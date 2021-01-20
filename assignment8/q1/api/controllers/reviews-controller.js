var mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.reviewsGetAll = function(req,res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game){

        let response = {
            status : 200,
            data : game
        };

        if (err) {
            console.log(err);
            response.status = 500;            
            response.data = {"message" : "System Error"};
        } else if(!game) {
            response.status=404;
            response.data = {"message" : "Game with ID not found"};
        }
        
        if (response.status == 200) {
            response.data = game.reviews;       
            // if (!game.publisher) {
            //     response.status = 404;
            //     response.data = {"message" : "There is no publisher"};
            // } else {
                
            // }
        }                

        res.status(response.status).json(response.data);
    });
};


module.exports.reviewsAddOne = function(req, res){    
    let newReview = {
        reviewer : req.body.reviewer,
        reviewDate :  req.body.reviewDate,
        reviewText :  req.body.reviewText          
    }
    console.log("new Review: ", newReview);
    const gameId = req.params.gameId;      
    Game.updateOne(
        {"_id":gameId},
        {
            $push: {"reviews" : newReview}
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
                    response.message = {"message" : "gameId not found"};
                }
            }
            res.status(response.status).json(response.message);
        }
    );

}


module.exports.reviewsGetOne = function(req, res) {
    const gameId = req.params.gameId; 
    const reviewId = req.params.reviewId; 
    Game.findOne({"_id": gameId, "reviews._id": reviewId}, function(err, obj) {
        let response = {
            status : 200,
            message : obj
        };
        if (err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
            console(err);
        } else if (!obj) {
            response.status = 404;
            response.message = {"message" : "ReviewId or GameId not found"};
        } else {
            response.status = 200;
            response.message = obj.reviews.id(reviewId);
        }

        res.status(response.status).json(response.message);
    });
}


module.exports.reviewsUpdateOne = function(req, res) {
    const gameId = req.params.gameId; 
    const reviewId = req.params.reviewId; 
    Game.updateOne(
        {"_id":gameId, "reviews._id": reviewId},
        {$set: {
            "reviews.$.reviewer" : req.body.reviewer,
            "reviews.$.reviewDate" : req.body.reviewDate,
            "reviews.$.reviewText" : req.body.reviewText            
        }}, function(err, doc) {
            let response = {
                status : 204,
                message : {"message" : "updated"}
            };
            if(err){
                response.status = 500;
                response.message = {"message" : "System Error"};
                console(err);
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = {"message" : "ReviewId or GameId not found"};
                }
            }
            res.status(response.status).json(response.message);
        });    
}


module.exports.reviewsDeleteOne = function(req,res) {
    const gameId = req.params.gameId; 
    const reviewId = req.params.reviewId; 
    Game.updateOne(
        {"_id":gameId},
        {$pull: {"reviews": {"_id" : reviewId}}
        },
        function(err, doc) {
            let response = {
                status : 204,
                message : {"message" : "deleted"}
            };
            if(err){
                response.status = 500;
                response.message = {"message" : "System Error"};
                console.log(err);
            } else {
                if (doc.nModified == 0) {
                    response.status = 404;
                    response.message = {"message" : "ReviewId or GameId not found"};
                }
            }
            res.status(response.status).json(response.message);
        }
    );
}
