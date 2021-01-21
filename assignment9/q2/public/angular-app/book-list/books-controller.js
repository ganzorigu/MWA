angular.module("bookApp").controller("BooksController", BooksController);

function BooksController(BookDataFactory){
    var vm = this;
    vm.title = "List of Books";
    BookDataFactory.getAllBooks().then(function(response){
        vm.books = response;
        //console.log("books:",responseData);
    });  
    
    vm.addBook = function() {
        console.log("adding book");
        var postData = {
            title : vm.newBookTitle,
            isbn : vm.newBookIsbn,
            checkOutDays : vm.newBookCheckoutDays            
        };

        console.log(postData);
        if (vm.bookForm.$valid) {
            console.log("adding");
            BookDataFactory.addOneBook(postData).then(function(response){
                console.log("book Saved");
                location.replace("/");
            });
        }else {
            vm.isSubmitted = true;
        }        
    } 

    vm.deleteBook = function(id){
        console.log("delete book with id: ", id);
        BookDataFactory.deleteOneBook(id).then(function(response){            
            vm.status = response;
            alert("Delete book with id:"+id);
            location.reload();
        });
    }
    
}