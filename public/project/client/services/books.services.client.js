"use strict";

(function() {
    angular
        .module("NextReadHuntApp")
        .factory("BookService", BookService);

    function BookService($http, $q) {

        var service = {
            addBook: addBook,
            findAllBooks: findAllBooks,
            deleteBookById: deleteBookById
        };

        return service;

        function addBook(book) {
            var deferred = $q.defer();
            $http.post("/api/project/book/"+book.userId+"/book", book)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllBooks(userId) {
            var deferred = $q.defer();
            $http.get("/api/project/book/"+userId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteBookById(bookId) {
            var deferred = $q.defer();
            $http.delete("/api/project/book/"+bookId)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();