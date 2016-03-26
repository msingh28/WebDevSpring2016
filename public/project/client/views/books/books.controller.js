"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("BooksController", BooksController);

    function BooksController($rootScope, $scope, BookService) {
        $scope.books = [];

        if($rootScope.currentUser != null) {
            BookService.findAllBooks($rootScope.currentUser._id)
                .then(function (response) {
                    $scope.books = response;
                });
        }

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentBook ={};
        $scope.addBook = function() {
            if($scope.bookName!=null && $scope.bookauthor!=null && $scope.bookisbn!=null) {
                currentBook.title = $scope.bookName;
                currentBook.author = $scope.bookauthor;
                currentBook.isbn = $scope.bookisbn;
                currentBook.userId = $rootScope.currentUser._id;
                BookService.addBook(currentBook)
                    .then(function(response){
                        $scope.books.push(response);
                    });
                $scope.bookName = null;
                $scope.bookauthor = null;
                $scope.bookisbn = null;
                currentBook = {};
            }
        }

        $scope.deleteBook = function(index) {
            currentBook = $scope.books[index];
            BookService.deleteBookById(currentBook._id)
                .then(function(response){
                    $scope.books.splice(index,1);
                });
            $scope.selectedFormIndex = null;
            $scope.bookName = null;
            $scope.bookauthor = null;
            $scope.bookisbn = null;
        }
    }
})();