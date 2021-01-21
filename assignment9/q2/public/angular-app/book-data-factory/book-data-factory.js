angular.module("bookApp").factory("BookDataFactory", BookDataFactory);

function BookDataFactory($http) {
    return {
        getAllBooks : getAllBooks,
        getSingleBook : getSingleBook,
        addOneBook: postBook,
        deleteOneBook : deleteBook

    };

    function getAllBooks(){
        console.log("get all books called");
        return $http.get("/api/books")
            .then(complete).catch(failed);
    }

    function getSingleBook(id){
        return $http.get("/api/books/"+id)
            .then(complete).catch(failed);
    }

    function postBook(book){
        return $http.post("/api/books/", book).then(complete).catch(failed);
    }

    function deleteBook(id) {
        return $http.delete("/api/books/"+id).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(err){
        //console.log("http get error:" ,err);
        return err.status.statusText;
    }

}