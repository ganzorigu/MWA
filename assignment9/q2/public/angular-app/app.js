angular.module("bookApp",["ngRoute"]).config(config);


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
}