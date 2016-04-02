module.exports = function(mongoose) {

    // use mongoose to declare a movie schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type: String,
            enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"]
        },
        placeholder: String,
        options: [{
            label: String,
            value : String
        }]
        /*// ids of users that like this movie
         likes: [String],
         // list of users that like this movie
         userLikes: [
         {username: String}
         ]*/,
        // store movie documents in this collection
    }, {collection: 'assignment.formMaker.field'});

    return FieldSchema;
};