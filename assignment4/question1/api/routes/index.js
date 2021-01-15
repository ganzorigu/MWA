var express = require("express");
const controllerGames = require("../controllers/games-controllers");
const controllerPublishers = require("../controllers/publisher-controller");
var router = express.Router();

router.route("/games").get(controllerGames.gamesGetAll);

router.route("/games/:gameId").get(controllerGames.gamesGetOne);    

router.route("/games/:gameId/publishers").get(controllerPublishers.publisherGetOne);

module.exports = router;
