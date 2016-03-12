"use strict";

(function() {
    angular
        .module("NextReadHuntApp")
        .factory("BookService", BookService);

    function BookService() {
        var books = [];

        books = [
            {"_id": "000", "title": "Harry Potter", "author": "J.K.R", "isbn": "isbn111", "userId": 123},
            {"_id": "010", "title": "Lord Of The Rings",   "author": "J.R.R.T",  "isbn": "isbn123", "userId": 123},
            {"_id": "020", "title": "The Da Vinci Code",   "author": "D.B.",  "isbn": "isbn234", "userId": 234}
        ];


        var service = {
            addBook: addBook,
            findAllBooks: findAllBooks,
            deleteBookById: deleteBookById,
            updateFormById: updateFormById
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

        function updateFormById(formId, newForm, callback) {
            var temp = null;
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i] = newForm;
                    temp =  forms[i];
                }
            }
            callback(temp);
        }
    }
})();