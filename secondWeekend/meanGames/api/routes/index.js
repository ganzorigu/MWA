var express = require("express");
const controllerGames = require("../controllers/games-controllers");
const controllerPublishers = require("../controllers/publisher-controller");
const controllerReviews = require("../controllers/reviews-controller");
const controllerUsers = require("../controllers/users-controller");
var router = express.Router();


router.route("/searchGames")
    .get(controllerGames.searchGame);
    
router.route("/searchGamesCnt")
    .get(controllerGames.searchGameCnt);

router.route("/games")
    .get(controllerUsers.authenticate, controllerGames.gamesGetAll)
    .post(controllerUsers.authenticate, controllerGames.gamesAddOne);

router.route("/games/:gameId")
    .get(controllerUsers.authenticate, controllerGames.gamesGetOne)
    .put(controllerUsers.authenticate, controllerGames.gamesUpdateOne)
    .delete(controllerUsers.authenticate, controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
    .get(controllerUsers.authenticate, controllerPublishers.publisherGetAll)
    .post(controllerUsers.authenticate, controllerPublishers.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
    .get(controllerUsers.authenticate, controllerPublishers.publisherGetOne)
    .put(controllerUsers.authenticate, controllerPublishers.publisherUpdateOne)
    .delete(controllerUsers.authenticate, controllerPublishers.publisherDeleteOne);

router.route("/games/:gameId/reviews")
    .get(controllerUsers.authenticate, controllerReviews.reviewsGetAll)
    .post(controllerUsers.authenticate, controllerReviews.reviewsAddOne);

router.route("/games/:gameId/reviews/:reviewId")
    .get(controllerUsers.authenticate, controllerReviews.reviewsGetOne)
    .put(controllerUsers.authenticate, controllerReviews.reviewsUpdateOne)
    .delete(controllerUsers.authenticate, controllerReviews.reviewsDeleteOne);

router.route("/users/register")
    .post(controllerUsers.register);

router.route("/users/login")
    .post(controllerUsers.login);

module.exports = router;