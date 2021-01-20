angular.module("bookApp").controller("BookDetailController", BookDetailController);

function BookDetailController($routeParams, BookDataFactory){
    var vm = this;
    var id = $routeParams.id;
    BookDataFactory.getSingleBook(id).then(function(response){
        vm.book = response;
        vm.authors = response.authors;
    })

}
