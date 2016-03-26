"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("ReviewsController", ReviewsController);

    function ReviewsController($rootScope, $scope, ReviewsService) {
        $scope.reviews = [];

        if($rootScope.currentUser != null) {
            ReviewsService.findAllReviewsForUser($rootScope.currentUser._id)
                .then(function (response) {
                    $scope.reviews = response;
                });
        }

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentReview = {};

        $scope.addReview = function() {
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
        }

        $scope.updateReview = function() {
            if($scope.bookId!=null && $scope.rating!=null && $scope.comments!=null) {
                currentReview = $scope.reviews[$scope.selectedFormIndex];
                currentReview.bookId = $scope.bookId;
                currentReview.rating = $scope.rating;
                currentReview.comments = $scope.comments;
                ReviewsService.updateReviewById(currentReview._id, currentReview)
                    .then(function (response){
                        $scope.reviews[$scope.selectedFormIndex] = response;
                    });
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