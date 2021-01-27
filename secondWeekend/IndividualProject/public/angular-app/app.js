angular.module("bookApp",["ngRoute","angular-jwt"]).config(config);


function config($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "./angular-app/book-list/booksList.html",
            controller : "BooksController",
            controllerAs : "BooksCtrl"
        })
        .when("/book/:id", {
            templateUrl : "./angular-app/book-detail/bookDetails.html",
            controller : "BookDetailController",
            controllerAs : "BookDetailCtrl"
        })      
        .when("/addBook", {
            templateUrl : "./angular-app/book-list/bookAdd.html",
            controller : "BooksController",
            controllerAs : "BooksCtrl"
        })   
        .when ("/register", {
            templateUrl : "angular-app/register/register.html",
            controller : "RegisterController",
            controllerAs : "registerCtrl",
            access : {restricted : false} 
        })       
}
function run ($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on ("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token 
            && !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root            
        }
    });
}