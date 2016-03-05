"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService()
    {
        var users = [];

        users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
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