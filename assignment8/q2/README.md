# Book Library Project
This project contains following objects.
* Book
* Author
* address

*Update: spa view is done*
*Todo: Update, delete, add*

Packages to install:
* npm install express
* npm install body-parser
* npm install mongoose
* npm install angular
* npm install angular angular-route

Here below is the relationship between these objects.
```javascript
const addressSchema = new mongoose.Schema({
    street : {
        type: String,
        required: true
    },
    zipcode : {
        type: Number,
        min: 10000,
        max: 99999,
        required: true        
    },
    city : {
        type: String,
        required: true        
    },
    state : {
        type: String,
        required: true        
    }
});

const authorSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    address: [addressSchema]
});

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    isbn : {
        type: String,        
        required: true
    },
    checkOutDays : {
        type: Number,
        required: true
    },
    authors : [authorSchema]
});
```


### REST API. 

**GET** all books 
http://localhost:4000/api/books/

**POST** add new book
http://localhost:4000/api/books/

**GET** get single book
http://localhost:4000/api/books/:bookId

**PUT** update single book
http://localhost:4000/api/books/:bookId

**DELETE** delete single book
http://localhost:4000/api/books/:bookId

Note: *Author and Address information can be modified using following api.*
http://localhost:4000/api/books/:bookId/authors/:authorId/addresses


![Alt text](./screenshots/addNewBook.png?raw=true "Optional Title")