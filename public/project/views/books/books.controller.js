"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("BooksController", BooksController);

    function BooksController($rootScope, $scope, BookService) {
        $scope.books = [];

        if($rootScope.currentUser != null) {
            BookService.findAllBooks($rootScope.currentUser._id,
                function (response) {
                    $scope.books = response;
                });
            console.log($scope.books);
        }

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentBook ={};
        $scope.addBook = function() {
            if($scope.bookName!=null && $scope.bookauthor!=null && $scope.bookisbn!=null) {
                currentBook.title = $scope.bookName;
                currentBook.author = $scope.bookauthor;
                currentBook.isbn = $scope.bookisbn;
                BookService.addBook($rootScope.currentUser._id, currentBook,
                    function(response){
                        console.log("followerResponse");
                        console.log(response);
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
            BookService.deleteBookById(currentBook._id,
                function(response){
                    $scope.books.splice(index,1);
                });
            $scope.selectedFormIndex = null;
            $scope.bookName = null;
            $scope.bookauthor = null;
            $scope.bookisbn = null;
        }
    }
})();