"use strict";
module.exports = function(mongoose) {

    var ReviewSchema = mongoose.Schema({
        rating: String,
        bookId: String,
        comments: String,
        userId: String,
    }, {collection: 'project.nextReadHunt.review'});

    return ReviewSchema;
};