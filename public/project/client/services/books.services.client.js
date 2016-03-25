"use strict";

(function() {
    angular
        .module("NextReadHuntApp")
        .factory("BookService", BookService);

    function BookService() {


        var service = {
            addBook: addBook,
            findAllBooks: findAllBooks,
            deleteBookById: deleteBookById
        };

        return service;

        function addBook(userId, book, callback) {
            book._id = (new Date).getTime();
            book.userId = userId;
            books.push(book);
            callback(book);
        }

        function findAllBooks(userId, callback) {
            var userBooks = [];
            for(var i=0; i < books.length; i++) {
                if(books[i].userId == userId){
                    userBooks.push(books[i]);
                }
            }
            callback(userBooks);
        }

        function deleteBookById(bookId, callback) {
            for(var i=0; i < books.length; i++) {
                if(books[i]._id == bookId) {
                    books.splice(i, 1);
                }
            }
            callback(books);
        }
    }
})();