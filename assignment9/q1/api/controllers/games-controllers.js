var mongoose = require("mongoose");
const Game = mongoose.model("Game");


var runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    //GeoJSON Point
    const point = {
        type: "Point",
        coordinates: [lng, lat]
    }
    console.log(point);
    Game.aggregate([
        {
            "$geoNear": {
                "near": point, 
                "spherical": true, 
                "distanceField": "dist.calculated", 
                "maxDistance": 750000
            }
        }
    ], function(err, results) {
        console.log("Geo results", results);
        if (err) {
            console.log("Geo err: ", err);
        }
        res.status(200).json(results);
    });

}


module.exports.gamesGetAll = function(req, res) {

    var count = 5;
    var offset = 0;
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);        
    };

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);         
    }

    if (req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req,res);
        return;
    }

    if (isNaN(count) || isNaN(offset)){
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
        return;
    }

    // Using Mongoose
    Game.find().skip(offset).limit(count).exec(function(err, games){
        //console.log("Found games ", games);
        res.status(200).json(games);
    })

}

module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;    
    console.log("Get game with gameId: ", gameId);

    Game.findById(gameId).exec(function(err, game){
        let response = {
            status : 200,
            message : game
        };

        if (err) {
            console.log(err);
            response.status = 500;            
            response.message = {"message" : "System Error"};
        } else if(!game) {
            response.status=404;
            response.message = {"message" : "Game with ID not found"};
        }
        res.status(response.status).json(response.message);            
    })    
};


module.exports.gamesAddOne = function(req, res){
    console.log("request body:")
    console.log(req.body);
    if (req.body && req.body.title && req.body.price) {        
        Game.create({
            title: req.body.title,
            year: req.body.year,
            rate: req.body.rate,
            price: req.body.price,
            minPlayers: req.body.minPlayers,
            maxPlayers: req.body.maxPlayers,
            publisher: [],
            reviews: [],
            minAge: req.body.minAge,
            designers: req.body.designers
        }, function(err, game){
            const response = {
                status: 201,
                message: game
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

module.exports.gamesUpdateOne = function(req, res) {
    const gameId = req.params.gameId;

    Game.findById(gameId).select("-reviews -publisher").exec(function(err,game){
        const response = {
            status: 204,
            message: game
        }
        if(err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
        } else if (!game){
            response.status = 404;
            response.message = {"message" : "Game Id not found"};
        }
        
        if (response.status != 204) {
            // something went wrong
            res.status(response.status).json(response.message);
        } else {
            // we got the game, need to update
            game.title = req.body.title;           
            game.year = parseInt(req.body.year);
            game.rate = parseInt(req.body.rate);
            game.price = parseFloat(req.body.price);
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.minAge = parseInt(req.body.minAge);
            game.designers = req.body.designers;   
            game.save(function(err, updatedGame){
                response.message = updatedGame;                
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


module.exports.gamesDeleteOne = function(req, res) {
    const gameId = req.params.gameId;

    Game.findByIdAndRemove(gameId).exec(function(err,deletedGame){
        const response = {
            status: 204,
            message: deletedGame
        }
        if(err) {
            response.status = 500;
            response.message = {"message" : "System Error"};
        } else if (!deletedGame){
            response.status = 404;
            response.message = {"message" : "Game Id not found"} ;
        }
        
        res.status(response.status).json(response.message);        
    });
}