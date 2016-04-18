"use strict";
module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String],
        likes: [String],
        reviews: [String],
        following: [String]
    }, {collection: 'project.nextReadHunt.user'});

    return UserSchema;
};