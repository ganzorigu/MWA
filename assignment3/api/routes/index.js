var express = require("express");
const controllerGames = require("../controllers/games-controllers");
var router = express.Router();

router.route("/games").get(controllerGames.gamesGetAll);

module.exports = router;
