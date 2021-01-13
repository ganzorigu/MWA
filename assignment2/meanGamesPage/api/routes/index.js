var express = require("express");
const controllerGames = require("../controllers/games-controllers");
var router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll);
    // .post(function(req, res) {
    //     console.log("JSON request made");
    //     res.status(200).json({
    //         "jsonData" : true
    //     });    
    // });

module.exports = router;
