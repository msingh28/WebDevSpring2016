"use strict";

var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel  = mongoose.model("UserModel", UserSchema);
   // var users = require("./user.mock.json");

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function Create(user) {
        var deferred = q.defer();
        UserModel.create(user, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("Sheet>");
                console.log(user);
                deferred.resolve(user);
            }
        });
        return deferred.promise;
       // user._id = uuid.v1();
       // users.push(user);
      //  return user;
    }

    function FindAll() {
        var deferred = q.defer();

        UserModel.find(function(err, users){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheets);
            }
        });

        return deferred.promise;
       // return users;
    }

    function FindById(id) {

        var deferred = q.defer();

        UserModel.findById(id, function(err, user){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
        /*var user=null;
        for(var i=0; i < users.length; i++) {
            if(users[i]._id==id){
                user = users[i];
            }
        }
        return user;*/
    }

    function Update(id, user) {
        var deferred = q.defer();

        user.delete("_id");

        UserModel.update({_id: id}, {$set: user}, function(err, user) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
        /*for(var i=0; i < users.length; i++) {
            if(users[i]._id==id){
                users[i] = user;
            }
        }
        return user;*/
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

        /*for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users.splice(i, 1);
            }
        }
        return users;*/
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findByUsername(username, function(err, username){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
       /* var user=null;
        for(var i=0; i < users.length; i++) {
            if(users[i].username == username){
                user = users[i];
            }
        }
        return user;*/
    }

    function findUserByCredentials(username, password) {
        UserModel.findByUserCredentials(username, password,  function(err, username, password){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
       /* var user = null;
        for(var i=0; i < users.length; i++){
            if(users[i].username == username && users[i].password == password){
                user = users[i];
            }
        }
        return user;*/
    }
}