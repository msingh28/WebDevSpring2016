"use strict";

var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var BookSchema = require("./book.schema.server.js")(mongoose);
    var ReviwModel  = mongoose.model("ReviewModel", BookSchema);

    var api = {
        Create: Create,
        //FindAll: FindAll,
        //FindById: FindById,
        //Update: Update,
        Delete: Delete
    };
    return api;

    function Create(bookId, review) {
        var deferred = q.defer();
        if(review._id){
            delete review._id;
        }

        ReviwModel.findById({_id : bookId}, function(err, book){
            if(err){
                deferred.reject(err);
            }else{
                var reviews = book.reviews
                reviews.push(review);
                book.reviews = reviews;
                book.save(function(err,updatedBook){
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(updatedBook);
                    }
                });
            }
        });
        return deferred.promise;
        /*review._id = uuid.v1();
        reviews.push(review);
        return review;*/
    }

    /*function FindAll(userId) {
        var deferred = q.defer();

        ReviwModel.findById({userId: userId}, function (err, reviws) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(reviws);
            }
        });
        return deferred.promise;
    }*/

    /*function FindById(id) {
        var review=null;
        for(var i=0; i < reviews.length; i++) {
            if(reviews[i]._id==id){
                review = reviews[i];
            }
        }
        return review;
    }*/

    /*function Update(id, review) {
        var deferred = q.defer();

        ReviwModel.findById({_id: id}, function (err, book) {
            if (err) {
                deferred.reject(err);
            } else {
                var fields = book.fields;
                for(var i=0; i<fields.length; i++){
                    if (fields[i]._id == fieldId) {
                        fields[i] = field;
                        break;
                    }
                }
                book.fields = fields;
                book.save(function(err,updatedForm){
                    if(err)
                    {
                        deferred.reject(err);
                    }
                    else
                    {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
        /!*for(var i=0; i < reviews.length; i++) {
            if(reviews[i]._id==id){
                reviews[i] = review;
            }
        }
        return review;*!/
    }*/

    function Delete(id) {
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i]._id == id) {
                reviews.splice(i, 1);
            }
        }
        return reviews;
    }
}