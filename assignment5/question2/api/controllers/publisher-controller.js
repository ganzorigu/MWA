var mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetAll = function(req,res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){

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
            response.data = game.publisher;       
            // if (!game.publisher) {
            //     response.status = 404;
            //     response.data = {"message" : "There is no publisher"};
            // } else {
                
            // }
        }                

        res.status(response.status).json(response.data);
    });
};

module.exports.publisherGetOne = function(req, res) {
    const gameId = req.params.gameId; 
    const publisherId = req.params.publisherId; 
    Game.findOne({"_id": gameId, "publisher._id": publisherId}, function(err, obj) {
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
            response.message = {"message" : "Publisher Id or gameId not found"};
        } else {
            response.status = 200;
            response.message = obj.publisher.id(publisherId);
        }

        res.status(response.status).json(response.message);
    });
}


module.exports.publisherAddOne = function(req, res){
    let longitude = parseFloat(req.body.lng);
    let lat = parseFloat(req.body.lat);
    if (isNaN(longitude) || isNaN(lat)) {
        res.status(501).json({"message" : "parameter type not supported"});
        return;
    }
    

    let newPublisher = {
        location : {coordinates : [longitude, lat]},
        name : req.body.name                         
    }
    const gameId = req.params.gameId; 
    const publisherId = req.params.publisherId; 
    Game.updateOne(
        {"_id":gameId},
        {
            $push: {"publisher" : newPublisher}
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

module.exports.publisherUpdateOne = function(req, res) {
    let longitude = parseFloat(req.body.lng);
    let lat = parseFloat(req.body.lat);
    if (isNaN(longitude) || isNaN(lat)) {
        res.status(501).json({"message" : "parameter type not supported"});
        return;
    }

    const gameId = req.params.gameId; 
    const publisherId = req.params.publisherId; 
    Game.updateOne(
        {"_id":gameId, "publisher._id": publisherId},
        {$set: {
            "publisher.$.name": req.body.name, 
            "publisher.$.location.coordinates" : [longitude, lat]
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
                    response.message = {"message" : "Publisher Id or gameId not found"};
                }
            }
            res.status(response.status).json(response.message);
        });    
}


module.exports.publisherDeleteOne = function(req,res) {
    const gameId = req.params.gameId; 
    const publisherId = req.params.publisherId; 
    Game.updateOne(
        {"_id":gameId},
        {$pull: {"publisher": {"_id" : publisherId}}
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
                    response.message = {"message" : "Publisher Id or gameId not found"};
                }
            }
            res.status(response.status).json(response.message);
        }
    );
}




module.exports.publisherAddOneOld = function(req, res){
    const gameId = req.params.gameId;    
    Game.findById(gameId).select("publisher").exec(function(err, game){
        const response = {
            status: 204,
            message: game
        }
        if(err) {
            console.log("err:", err);
            response.status = 500;            
            response.data = {"message" : "System Error"};
        } else if (!game){
            response.status = 404;            
            response.data = {"message" : "Game Id not found"};
        }

        if (response.status != 204) {
            // something went wrong
            res.status(response.status).json(response.message);
        } else {
            // we got the game, need to update
            var newPublisher;
            newPublisher = {location : {coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]},
                        name : req.body.name                         
                        }
            // publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            // publisher.name = req.body.name;
            game.publisher.push(newPublisher);
            game.save(function(err, updatedGame){
                var response= {status: 200, message: []};
                if (err) {
                    console.log("err:", err);
                    response.status = 500;            
                    response.data = {"message" : "System Error"};
                } else {
                    response.status= 201;
                    response.data= updatedGame.publisher;
                }
                res.status(response.status).json(response.message);
            })         
        }
    });
};


module.exports.publisherGetOneOld = function(req,res) {
    const gameId = req.params.gameId; 
    const publisherId = req.params.publisherId; 
    Game.findById(gameId).select("publisher").exec(function(err, game){
        const response = {
            status: 200,
            data: game
        }
        if(err) {
            console.log("err:", err);
            response.status = 500;
            response.data = {"message" : "System Error"};
        } else if (!game){
            response.status = 404;
            response.message = "Game Id not found";
            response.data = {"message" : "Game Id not found"};
        }

        if (response.status==200) {
            let publisher = game.publisher.id(publisherId);
            console.log("publisher: ",publisher);
            response.message = publisher;
            if (!publisher) {
                response.status = 404;
                response.message = {"message" : "publisher Id not found under game with id:"+gameId};
            }            
        }
        res.status(response.status).json(response.message);            
    });
}


module.exports.publisherUpdateOneOld = function(req,res) {
    const gameId = req.params.gameId; 
    const publisherId = req.params.publisherId; 
    var updatedPublisher = {location : {coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]},
    name : req.body.name                         
    };
    Game.findById(gameId).select("publisher._id="+publisherId).exec(function(err, game){        
        const response = {
            status: 200,
            data: game
        }
        if(err) {
            console.log("err:", err);
            response.status = 500;
            response.data = {"message" : "System Error"};
            res.status(response.status).json(response.message);            
            return;
        } else if (!game){
            response.status = 404;
            response.message = "Game Id not found";
            response.data = {"message" : "Game Id not found"};
            res.status(response.status).json(response.message);            
            return;
        }

        if (response.status==200) {            
            let publisher = game.publisher.id(publisherId);
            console.log("publisher: ",publisher);
            response.message = publisher;            

            if (!publisher) {
                response.status = 404;
                response.message = {"message" : "publisher Id not found under game with id:"+gameId};
                res.status(response.status).json(response.message);            
                return;
            }else {

                let thePublisher = game.publisher.id(publisherId);
                var updatedPublisher = {
                    location : {coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]},
                    name : req.body.name,
                    _id : publisherId                         
                };


                //thePublisher = updatedPublisher;
                console.log("publisher all: ", game.publisher)
                //game.publisher.id(publisherId)
                game.publisher.filter(x => x._id==publisherId).map(x => {
                    x.name = updatedPublisher.name;
                    x.location = updatedPublisher.location;
                });
                game.save(function(err, updatedGame){
                    var response= {status: 200, message: []};
                    if (err) {
                        console.log("err:", err);
                        response.status = 500;            
                        response.data = {"message" : "System Error"};
                    } else {
                        response.status= 204;
                        response.data= updatedGame.publisher;
                    }
                    res.status(response.status).json(response.message);
                }) 
            }            
        }
        //res.status(response.status).json(response.message);            
    });    
};

module.exports.publisherDeleteOneOld = function(req,res) {
    const gameId = req.params.gameId;    
    Game.findById(gameId).select("publisher").exec(function(err, game){

        const response = {
            status: 204,
            message: game
        }
        if(err) {
            response.status = 500;
            response.message = err;
        } else if (!game){
            response.status = 404;
            response.message = "Game Id not found";
        }

        if (response.status != 204) {
            // something went wrong
            res.status(response.status).json(response.message);
        } else {
            // we got the game, need to update            
            game.publisher = [];
            game.save(function(err, updatedGame){
                var response= {status: 200, message: []};
                if (err) {
                    response.status= 500;
                    response.message= err;
                } else {
                    response.status= 201;
                    response.message= updatedGame.publisher;
                }
                res.status(response.status).json(response.message);
            })         
        }
    });
};
