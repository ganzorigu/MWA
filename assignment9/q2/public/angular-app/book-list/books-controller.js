angular.module("bookApp").controller("BooksController", BooksController);

function BooksController(BookDataFactory){
    var vm = this;
    vm.title = "List of Books";
    BookDataFactory.getAllBooks().then(function(response){
        vm.books = response;
        //console.log("books:",responseData);
    });             
}