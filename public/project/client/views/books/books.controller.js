"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("BooksController", BooksController);

    function BooksController($rootScope, $scope, BookService, UserService) {
        $scope.books = [];

        if($rootScope.currentUser != null) {
            UserService.findAllBooks($rootScope.currentUser._id)
                .then(function (response) {
                    console.log("In books controller");
                    console.log(response);
                    $scope.books = response;
                });
        }

        //$scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentBook ={};

        $scope.deleteBook = function(id) {
            //currentBook = $scope.books[index];
            //console.log(index);
            UserService.deleteBookById(id, $rootScope.currentUser._id)
                .then(function(response){
                    console.log("in books controller");
                    console.log(response)
                   // $scope.books = $rootScope.currentUser.books;
                   $scope.books = response.books;
                });
            $scope.selectedFormIndex = null;

        }
    }
})();