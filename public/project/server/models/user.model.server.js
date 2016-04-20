"use strict";

var uuid = require('node-uuid');
var q = require("q");
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        Following: Following,
        updateFollowing: updateFollowing,
        deleteFollowing: deleteFollowing,
        getBooks: getBooks,
        deleteBook: deleteBook,
        deleteReview: deleteReview,
        getReviews: getReviews
    };
    return api;

    function Create(user) {
        console.log("I cam in model");
        var deferred = q.defer();
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return deferred.promise;
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return deferred.promise;
                user.password = hash;
                UserModel.create(user, function(err, user) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                        /*user.save(function(err, updatedUser) {
                         if(err) {
                         deferred.reject(err);
                         } else {
                         deferred.resolve(updatedUser);
                         }
                         });*/
                    }
                });
            });

        });
        //console.log("I am creating new user hashed password")
        ///console.log(newUser.password);

        return deferred.promise;
    }

    function FindAll() {
        var deferred = q.defer();
        UserModel.find(function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function FindById(id) {
        var deferred = q.defer();
        UserModel.find({_id: {$in: id}}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("In modal");
                console.log(user);
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function Update(id, user) {
        var deferred = q.defer();
        delete user._id;
        UserModel.update({_id: id}, {$set: user}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                //console.log(user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();
console.log("I cam in model to delete user");
        UserModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        UserModel.findOne({username: username}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            {
                username: credentials.username
            },
            function (err, user) {
                if (err) {
                    deferred.reject(err);
                } else {
                    bcrypt.compare(credentials.password, user.password, function (err, isMatch){
                        if(isMatch) {
                            deferred.resolve(user);
                        }
                    });

                }
            });

        return deferred.promise;
    }


    function Following(userId) {
        var deferred = q.defer();

        UserModel.find({_id: {$in: userId}}, function (err, users) {

            if (err) {
                deferred.reject(err);
            } else {
                var following = [];
                //console.log(users);
                var userFollowing = users[0].following;
               deferred.resolve(userFollowing);
                //console.log(following);
            }
        });

        return deferred.promise;

        /*for(var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                for(var j = 0; j< users[i].following.length; j++) {
                    following.push(FindById(users[i].following[j]));
                }
                break;
            }
        }
        return following;*/
    }

    function getBooks(userId) {
        console.log("I am inside book model")
        var deferred = q.defer();
        console.log(userId);
        UserModel.findOne({_id: userId}, function (err, users) {
            if (err) {

                deferred.reject(err);
            } else {
                console.log("In user model");
                //console.log(users.books);
                deferred.resolve(users.books);
            }
        });

        return deferred.promise;

        /*for(var i = 0; i < users.length; i++) {
         if(users[i]._id == userId) {
         for(var j = 0; j< users[i].following.length; j++) {
         following.push(FindById(users[i].following[j]));
         }
         break;
         }
         }
         return following;*/
    }

    function getReviews(userId) {
       // console.log("I am inside book model")
        var deferred = q.defer();
        //console.log(userId);
        UserModel.findOne({_id: userId}, function (err, users) {
            if (err) {

                deferred.reject(err);
            } else {
                console.log("In user model");
                //console.log(users.books);
                deferred.resolve(users.reviews);
            }
        });

        return deferred.promise;

        /*for(var i = 0; i < users.length; i++) {
         if(users[i]._id == userId) {
         for(var j = 0; j< users[i].following.length; j++) {
         following.push(FindById(users[i].following[j]));
         }
         break;
         }
         }
         return following;*/
    }

    function updateFollowing(userId, following) {
        var deferred = q.defer();
        var newFollowing=null;
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                    UserModel.findOne({username: following}, function (err, followingUser) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            newFollowing = followingUser;
                            user.following.push(followingUser._id);
                        }
                    });

                deferred.resolve(newFollowing);
            }
        });

        return deferred.promise;
        /*console.log("model");
        console.log(userId);
        var newFollowing = null;
        for(var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                newFollowing = findUserByUsername(following);
                console.log(following);
                users[i].following.push(newFollowing._id);
            }
        }
        return newFollowing;*/
    }

    function deleteFollowing(userId, followingId) {
        var deferred = q.defer();
        var newFollowing=null;
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                var index = user.following.indexOf(followingId);
                user.following.splice(index, 1);

                deferred.resolve(user);
            }
        });

        return deferred.promise;
        /*var following = [];
        for(var i = 0; i < users.length; i++) {
            if(users[i]._id == userId) {
                following = users[i].following;
                for (var j = 0; j < following; j++) {
                    if (following[j]._id == followingId) {
                        users[j].following.splice(j, 1);
                    }
                }
            }
        }*/
    }

    function deleteBook(userId, bookId) {
        var deferred = q.defer();
        var newFollowing=null;
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log("In delete book");
                //console.log(user);
                var index = user.books.indexOf(bookId);
                user.books.splice(index, 1);
                //deferred.resolve(user);
               // user.books = books;
                user.save(function(err, updatedUser) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });

        return deferred.promise;
        /*var following = [];
         for(var i = 0; i < users.length; i++) {
         if(users[i]._id == userId) {
         following = users[i].following;
         for (var j = 0; j < following; j++) {
         if (following[j]._id == followingId) {
         users[j].following.splice(j, 1);
         }
         }
         }
         }*/
    }

    function deleteReview(userId, reviewId) {
        var deferred = q.defer();
        var newFollowing=null;
        UserModel.findOne({_id: userId}, function (err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log("In delete book");
                //console.log(user);
                var index = user.reviews.indexOf(reviewId);
                user.reviews.splice(index, 1);
                //deferred.resolve(user);
                // user.books = books;
                user.save(function(err, updatedUser) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedUser);
                    }
                });
            }
        });

        return deferred.promise;
        /*var following = [];
         for(var i = 0; i < users.length; i++) {
         if(users[i]._id == userId) {
         following = users[i].following;
         for (var j = 0; j < following; j++) {
         if (following[j]._id == followingId) {
         users[j].following.splice(j, 1);
         }
         }
         }
         }*/
    }
}