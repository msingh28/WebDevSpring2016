module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    // use mongoose to declare a movie schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: {type: Date, default: Date.now()},
        updated: {type: Date, default: Date.now()}
        /*// ids of users that like this movie
         likes: [String],
         // list of users that like this movie
         userLikes: [
         {username: String}
         ]*/,
        // store movie documents in this collection
    }, {collection: 'assignment.formMaker.form'});
    return FormSchema;
};