"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($routeParams, $rootScope, $scope, ReviewsService, UserService, BookService) {
        $scope.reviews = [];
        var targetProfileId = $routeParams.userId;
        if($rootScope.currentUser){
            if($rootScope.currentUser._id == targetProfileId){
                $scope.currentuser = $rootScope.currentUser;
                $scope.disableProfile = false;
                UserService.findAllReviewsForUser($rootScope.currentUser._id)
                    .then(function (response) {
                       // console.log(response);
                        $scope.reviews = response;
                    });

            }else {
                UserService.findUserById(targetProfileId)
                    .then(function (response) {
                        console.log(response);
                        $scope.currentuser = response;
                    })
                    .then(function (response) {
                        UserService.findAllReviewsForUser($scope.currentuser._id)
                            .then(function (response) {
                                console.log(response);
                                $scope.reviews = response;
                            });
                    });
            }

        }

       /* if($rootScope.currentUser != null) {
            UserService.findAllReviewsForUser($rootScope.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    $scope.reviews = response;
                });
        }*/

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentReview = {};

        /*$scope.addReview = function() {
            if($scope.bookId!=null && $scope.rating!=null && $scope.comments!=null) {
                currentReview.bookId = $scope.bookId;
                currentReview.rating = $scope.rating;
                currentReview.comments = $scope.comments;
                currentReview.userId = $rootScope.currentUser._id;
                ReviewsService.createReviewForUser(currentReview)
                    .then(function(response){
                        $scope.reviews.push(response);
                    });
                $scope.bookId = null;
                $scope.rating = null;
                $scope.comments = null;
                currentReview = {};
            }
        }*/

        $scope.updateReview = function() {
            if($scope.bookName!=null && $scope.rating!=null && $scope.comments!=null) {
                currentReview = $scope.reviews[$scope.selectedFormIndex];
                currentReview.rating = $scope.rating;
                currentReview.comments = $scope.comments;
                ReviewsService.updateReviewById(currentReview._id, currentReview)
                    .then(function (response){
                        $scope.reviews[$scope.selectedFormIndex] = response;
                    });

                UserService.updateReview($rootScope.currentUser._id, currentReview)
                    .then(function(respone){
                        $rootScope.currentUser = respone;
                    })

                BookService.update(currentReview.bookId, currentReview)
                    .then(function(response){

                    })
                currentReview = {};
                $scope.bookId = null;
                $scope.rating = null;
                $scope.comments = null;
                $scope.selectedFormIndex = null;
                $scope.disable = true;
            }
        }

        $scope.deleteReview = function(index) {
            currentReview = $scope.reviews[index];
            ReviewsService.deleteReviewById(currentReview._id)
                .then(function(response){
                    $scope.reviews.splice(index,1);
                });
            UserService.deleteReviewById(currentReview._id, $rootScope.currentUser._id)
                .then(function(response){
                    $rootScope.currentUser = response;
                })
            BookService.deleteReview(currentReview.bookId, currentReview)
                .then(function(response){

                })

            $scope.selectedFormIndex = null;
            $scope.bookId = null;
            $scope.rating = null;
            $scope.comments = null;
        }

        $scope.selectReview = function(index) {
            $scope.selectedFormIndex = index;
            $scope.bookId = $scope.reviews[index].bookId;
            $scope.rating = $scope.reviews[index].rating;
            $scope.comments = $scope.reviews[index].comments;
            $scope.disable = false;
        }
    }
})();