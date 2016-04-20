"use strict";

var uuid = require('node-uuid');
var q = require("q");
module.exports = function(db, mongoose) {

    var BookSchema = require("./book.schema.server.js")(mongoose);
    var BookModel  = mongoose.model("BookModel", BookSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        //FindBooksByUserId: FindBooksByUserId,
        FindById: FindById,
        Delete: Delete,
        findBookByTitle: findBookByTitle,
        findReviews: findReviews,
        update: update,
        FindAllReviews: FindAllReviews
    };
    return api;

    function Create(book) {
        console.log("model.js");
        var deferred = q.defer();
        BookModel.create(book, function(err, book) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(book);
                /* user.save(function(err, updatedUser) {
                 if(err) {
                 deferred.reject(err);
                 } else {
                 deferred.resolve(updatedUser);
                 }
                 });*/
            }
        });
       /* book._id = uuid.v1();
        books.push(book);
        return book;*/
        return deferred.promise;
    }

    function update(bookId, newReview){
        var deferred = q.defer();
        delete newReview._id;
        BookModel.findOne({bookId: bookId}, function (err, book) {
            if (err) {
                deferred.reject(err);
            } else {
                book.reviews.push(newReview);
                book.save(function (err, updatedBook) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedBook);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        BookModel.find(function (err, books) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("In book model Findall");
                console.log(books);
                deferred.resolve(books);
            }
        });

        return deferred.promise;
        /*return books;*/
    }

    function FindAllReviews(bookId){
        var deferred = q.defer();
        BookModel.findOne({bookId: bookId}, function (err, book) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("In book model Findall");
                console.log(book);
                deferred.resolve(book.reviews);
            }
        });

        return deferred.promise;
    }

    /*function FindBooksByUserId(userId){
        /!*var userBooks = [];
        for(var i=0; i < books.length; i++) {
            if(books[i].userId == userId){
                userBooks.push(books[i]);
            }
        }
        return userBooks;*!/
    }*/


    function FindById(id) {
        var deferred = q.defer();
        BookModel.findOne({bookId: id}, function (err, book) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(book);
            }
        });

        return deferred.promise;
        /*var book=null;
        for(var i=0; i < books.length; i++) {
            if(books[i]._id==id){
                book = books[i];
            }
        }
        return book;*/
    }

    function Delete(id) {
        var deferred = q.defer();

        BookModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                status.save(function(err, updatedUser) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });

        return deferred.promise;
        /*for (var i = 0; i < books.length; i++) {
            if (books[i]._id == id) {
                books.splice(i, 1);
                return books;
            }
        }*/
    }

    function findBookByTitle(title) {
        var deferred = q.defer();
        BookModel.findOne({title: title}, function (err, book) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(book);
            }
        });

        return deferred.promise;
        /*var book = null;
        for(var i=0; i < books.length; i++) {
            if(books[i].title == title){
                book = books[i];
            }
        }
        return book;*/
    }

    function findReviews(id) {
        var deferred = q.defer();
        BookModel.findOne({_id: id}, function (err, book) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(book.reviews);
            }
        });
        return deferred.promise;
    }
}
