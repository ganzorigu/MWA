var mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports.publisherGetOne = function(req,res) {
    const gameId = req.params.gameIdl
    Game.findById(gameId).select("publisher").exec(function(err, game){
        var publisher = game.publisher;
        res.status(200).json(publisher);
    });
};
