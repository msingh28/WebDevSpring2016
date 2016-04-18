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
        deleteFollowing: deleteFollowing
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
                        /* user.save(function(err, updatedUser) {
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
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }

    function Update(id, user) {
        var deferred = q.defer();
        delete user._id;
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return deferred.promise;
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return deferred.promise;
                user.password = hash;
                UserModel.update({_id: id}, {$set: user}, function(err, user) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        //console.log(user);
                        deferred.resolve(user);
                    }
                });
            });
        });
        return deferred.promise;
    }

    function Delete(id) {
        var deferred = q.defer();

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
        var following = [];
        UserModel.findOne({_id: userId}, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                for(var j=0; j<users.following.length;j++) {
                    UserModel.findOne({_id: userId}, function (err, user) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            following.push(user)
                        }
                    });
                }
                deferred.resolve(following);
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
}