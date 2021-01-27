angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($httpProvider, $routeProvider) {    
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider
        .when("/", {
            templateUrl : "angular-app/game-list/games.html",
            controller : "GamesController",
            controllerAs : "gameCtrl",
            access : {restricted : true} 
        })
        .when ("/games", {
            templateUrl: "angular-app/game-list/addGame.html",
            controller : "GamesController",
            controllerAs : "gameCtrl",
            access : {restricted : true} 
        })
        .when ("/game/:id", {
            templateUrl: "angular-app/game-display/game.html",
            controller : "SingleGameController",
            controllerAs : "SingleGameCtrl",
            access : {restricted : false} 
        })
        .when ("/register", {
            templateUrl : "angular-app/register/register.html",
            controller : "RegisterController",
            controllerAs : "registerCtrl",
            access : {restricted : false} 
        })
        .when("/profile", {
            templateUrl : "angular-app/register/register.html",
            // controller : "RegisterController",
            controllerAs : "vm",
            access : {restricted : true} 
        })
}

function run ($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on ("$r outeCh angeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token 
            && !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root            
        }
    });
}