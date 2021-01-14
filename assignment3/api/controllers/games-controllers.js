var dbConnection = require("../data/dbconnection.js");

module.exports.gamesGetAll = function(req, res) {
    var db = dbConnection.get();
    var collection = db.collection("games");
    
    var count = 3;
    
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count>7) {
            count = 7;
        }         
    };

    console.log("count:", count);
    collection.find().limit(count).toArray(function(err, docs) {
        //console.log("Found games", docs);
        res.status(200).json(docs);
    });  
}