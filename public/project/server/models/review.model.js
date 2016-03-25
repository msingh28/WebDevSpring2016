"use strict";

var uuid = require('node-uuid');

module.exports = function() {

    var reviews = require("./review.mock.json");

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete
    };
    return api;

    function Create(review) {
        review._id = uuid.v1();
        reviews.push(review);
        return review;
    }

    function FindAll(userId) {
        var userReviews = [];
        for(var i=0; i < reviews.length; i++) {
            if(reviews[i].userId == userId){
                userReviews.push(reviews[i]);
            }
        }
        return userReviews;
    }

    function FindById(id) {
        var review=null;
        for(var i=0; i < reviews.length; i++) {
            if(reviews[i]._id==id){
                review = reviews[i];
            }
        }
        return review;
    }

    function Update(id, review) {
        for(var i=0; i < reviews.length; i++) {
            if(reviews[i]._id==id){
                reviews[i] = user;
            }
        }
        return review;
    }

    function Delete(id) {
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i]._id == id) {
                reviews.splice(i, 1);
            }
        }
        return reviews;
    }
}