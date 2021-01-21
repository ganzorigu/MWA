angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {    
    $routeProvider
        .when("/", {
            templateUrl : "angular-app/game-list/games.html",
            controller : "GamesController",
            controllerAs : "gameCtrl" 
        })
        .when ("/game/:id", {
            templateUrl: "angular-app/game-display/game.html",
            controller : "SingleGameController",
            controllerAs : "SingleGameCtrl"
        })
}