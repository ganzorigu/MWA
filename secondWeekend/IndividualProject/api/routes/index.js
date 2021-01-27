const express = require("express");
const booksController = require("../controllers/books-controller");
const authorsController = require("../controllers/authors-controller");
const addressesController = require("../controllers/address-controller");
const controllerUsers = require("../controllers/users-controller");
const router = express.Router();

router.route("/searchBooks")
    .get(booksController.searchBook);
    
router.route("/searchBooksCnt")
    .get(booksController.searchBookCnt);

router.route("/books")
        .get(booksController.booksGetAll)
        .post(booksController.booksAddOne);
router.route("/books/:bookId")
        .get(booksController.booksGetOne)
        .put(booksController.booksUpdateOne)
        .delete(booksController.booksDeleteOne);

router.route("/books/:bookId/authors")
        .get(authorsController.authorsGetAll)
        .post(authorsController.authorsAddOne);

router.route("/books/:bookId/authors/:authorId")
        .get(authorsController.authorsGetOne)
        .put(authorsController.authorsUpdateOne)
        .delete(authorsController.authorsDeleteOne);

router.route("/books/:bookId/authors/:authorId/addresses")
        .get(addressesController.addressesGetAll)
        .post(addressesController.addressesAddOne);

router.route("/books/:bookId/authors/:authorId/addresses/:addressId")
        .get(addressesController.addressesGetOne);

router.route("/users/register")
        .post(controllerUsers.register);
    
router.route("/users/login")
        .post(controllerUsers.login);        

module.exports = router;

