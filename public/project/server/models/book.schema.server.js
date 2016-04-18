"use strict";
module.exports = function(mongoose) {

    var BookSchema = mongoose.Schema({
        title: String,
        thumbnail:String,
        authors: [String],
        isbn: String,
        likes: [String],
        reviews: [String]
    }, {collection: 'project.nextReadHunt.book'});

    return BookSchema;
};