var express = require("express");
const controllerGames = require("../controllers/games-controllers");
const controllerPublishers = require("../controllers/publisher-controller");
var router = express.Router();

router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne);

router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesUpdateOne)
    .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublishers.publisherGetAll)
    .post(controllerPublishers.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
    .get(controllerPublishers.publisherGetOne)
    .put(controllerPublishers.publisherUpdateOne)
    .delete(controllerPublishers.publisherDeleteOne);

module.exports = router;
