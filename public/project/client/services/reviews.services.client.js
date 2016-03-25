"use strict";

(function() {
    angular
        .module("NextReadHuntApp")
        .factory("ReviewsService", ReviewsService);

    function ReviewsService() {
        var service = {
            createReviewForUser: createReviewForUser,
            findAllReviewsForUser: findAllReviewsForUser,
            deleteReviewById: deleteReviewById,
            updateReviewById: updateReviewById
        };

        return service;

        function createReviewForUser(userId, review, callback) {
            review._id = (new Date).getTime();
            review.userId = userId;
            reviews.push(review);
            callback(review);
        }

        function findAllReviewsForUser(userId, callback) {
            var userReviews = [];
            for(var i=0; i < reviews.length; i++) {
                if(reviews[i].userId == userId){
                    userReviews.push(reviews[i]);
                }
            }
            callback(userReviews);
        }

        function deleteReviewById(reviewId, callback) {
            for(var i=0; i < reviews.length; i++) {
                if(reviews[i]._id == reviewId) {
                    reviews.splice(i, 1);
                }
            }
            callback(reviews);
        }

        function updateReviewById(reviewId, newReview, callback) {
            var temp = null;
            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i]._id == reviewId) {
                    reviews[i] = newReview;
                    temp =  reviews[i];
                }
            }
            callback(temp);
        }
    }
})();