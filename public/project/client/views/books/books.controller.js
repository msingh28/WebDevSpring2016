"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("BooksController", BooksController);

    function BooksController($routeParams, $rootScope, $scope, BookService, UserService) {
        $scope.books = [];
        var targetProfileId = $routeParams.userId;
        if($rootScope.currentUser){
            if($rootScope.currentUser._id == targetProfileId){
                $scope.currentuser = $rootScope.currentUser;
                $scope.disableProfile = false;
                UserService.findAllBooks($rootScope.currentUser._id)
                    .then(function (response) {
                        $scope.books = response;
                    });

            }else {
                UserService.findUserById(targetProfileId)
                    .then(function (response) {
                        console.log(response);
                        $scope.currentuser = response;
                    })
                    .then(function (response) {
                        UserService.findAllBooks($scope.currentuser._id)
                            .then(function (response) {
                                $scope.books = response;
                            });
                });
            }

        }

        /*if($rootScope.currentUser != null) {
            UserService.findAllBooks($rootScope.currentUser._id)
                .then(function (response) {
                    console.log("In books controller");
                    console.log(response);
                    $scope.books = response;
                });
        }*/

        //$scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentBook ={};

        $scope.deleteBook = function(id) {
            //currentBook = $scope.books[index];
            //console.log(index);
            UserService.deleteBookById(id, $rootScope.currentUser._id)
                .then(function(response){
                    //console.log("in books controller");
                   // console.log(response)
                   // $scope.books = $rootScope.currentUser.books;
                   $scope.books = response.books;
                });
            $scope.selectedFormIndex = null;

        }
    }
})();