angular.module("bookApp").controller("BooksController", BooksController);

function BooksController(BookDataFactory){
    var vm = this;
    vm.title = "List of Books";
    // vm.chosenTitle = "";
    // BookDataFactory.getAllBooks().then(function(response){
    //     vm.currPage = 0;
    //     vm.books = response;
    //     //console.log("books:",responseData);
    // });  

    BookDataFactory.searchBook("",0).then(function(response){
        vm.currPage = 0;
        vm.books = response;
        vm.chosenTitle = "";            
    })

    BookDataFactory.searchBookCnt("").then(function(response){
        vm.pages = parseInt(response);        
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
    

    vm.getPageBooks = function(chosenPage) {
        vm.currPage = chosenPage;
        console.log("page:", vm.currPage);
        BookDataFactory.searchBook(vm.chosenTitle, chosenPage).then(function(response){
            vm.books = response;            
        })        
    }


    vm.searchByTitle = function(title) {
        console.log("search the game title:", title);

        BookDataFactory.searchBookCnt(title).then(function(response){
            vm.pages = parseInt(response);        
        }); 

        BookDataFactory.searchBook(title,0).then(function(response){
            vm.books = response;
            vm.chosenTitle = title;            
        })
    }

}