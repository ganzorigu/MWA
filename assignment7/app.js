angular.module("myProperApp", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "main/main.html",
        controller: "MainController",        
        controllerAs: "mainCtrl"
    })
    .when("/about", {
        templateUrl: "about/about.html",
        controller : "AboutController",
        controllerAs: "aboutCtrl"
    })
    .when("/jokes", {
        templateUrl : "joke/jokes.html",
        controller : "jokeController",
        controllerAs : "jokeCtrl"
    })
    .when("/lyrics", {
        templateUrl : "lyrics/lyrics.html",
        controller : "lyricsController",
        controllerAs : "lyricsCtrl"
    })
    .otherwise({
        redirectTo: "/"
    });
}