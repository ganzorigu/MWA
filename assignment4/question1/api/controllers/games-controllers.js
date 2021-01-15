var mongoose = require("mongoose");
const Game = mongoose.model("Game");


module.exports.gamesGetAll = function(req, res) {

    var count = 0;
    var offset = 5
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);        
    };

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);         
    }

    if (isNaN(count) || isNaN(offset)){
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
        return;
    }

    // Using Mongoose
    Game.find().skip(offset).limit(count).exec(function(err, games){
        console.log("Found games ", games);
        res.status(200).json(games);
    })

}

module.exports.gamesGetOne = function(req, res) {
    const gameId = req.params.gameId;    
    console.log("Get game with gameId: ", gameId);

    Game.findById(gameId).exec(function(err, game){
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
        res.status(response.status).json(response.data);            
    })    
};
