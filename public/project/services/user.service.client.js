"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .factory("UserService", UserService);

    function UserService()
    {
        var users = [];

        users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",            "following":[234, 345],
                "username":"alice",  "password":"alice",   "roles": ["user"],                  "books":[111, 222]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",                   "following":[345],
                "username":"bob",    "password":"bob",     "roles": ["admin"],                  "books":[111, 222]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",                  "following":[456],
                "username":"charlie","password":"charlie", "roles": ["user"],                   "books":[222]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",                  "following":[],
                "username":"dan",    "password":"dan",     "roles": ["user", "admin"],          "books":[111, 222]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",                 "following":[456],
                "username":"ed",     "password":"ed",      "roles": ["user"],                   "books":[333]		}
        ];

        var service = {
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser
        };

        return service;

        function findAllUsers(callback) {
            callback(users);
        }

        function findUserByCredentials(username, password, callback) {
            var user = null;
            for(var i=0; i < users.length; i++){
                if(users[i].username == username && users[i].password == password){
                    user = users[i];
                }
            }
            callback(user);
        }

        function createUser(user,callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user)
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            var updatedUser = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i] = user;
                    updatedUser = user;
                }
            }
            callback(updatedUser);
        }
    }
})();