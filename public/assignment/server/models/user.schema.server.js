module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]
        /*// ids of users that like this movie
        likes: [String],
        // list of users that like this movie
        userLikes: [
            {username: String}
        ]*/,
        // store movie documents in this collection
    }, {collection: 'assignment.formMaker.user'});

    return UserSchema;
};