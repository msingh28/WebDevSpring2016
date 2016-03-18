"use strict";

var uuid = require('node-uuid');

module.exports = function() {

    var users = require("./user.mock.json");

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
        user._id = uuid.v1();
        users.push(user);
        return user;
    }

    function FindAll() {
        return users;
    }

    function FindById(id) {
        var user=null;
        for(var i=0; i < users.length; i++) {
            if(users[i]._id==id){
                user = users[i];
            }
        }
        return user;
    }

    function Update(id, user) {
        for(var i=0; i < users.length; i++) {
            if(users[i]._id==id){
                users[i] = user;
            }
        }
        return user;
    }

    function Delete(id) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]._id == id) {
                users.splice(i, 1);
            }
        }
        return users;
    }

    function findUserByUsername(username) {
        var user=null;
        for(var i=0; i < users.length; i++) {
            if(users[i].username == username){
                user = users[i];
            }
        }
        return user;
    }

    function findUserByCredentials(username, password) {
        var user = null;
        for(var i=0; i < users.length; i++){
            if(users[i].username == username && users[i].password == password){
                user = users[i];
            }
        }
        return user;
    }
}