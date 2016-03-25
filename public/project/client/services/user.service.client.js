"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .factory("UserService", UserService);

    function UserService()
    {

        var service = {
            findAllUsers : findAllUsers,
            findUserByCredentials:findUserByCredentials,
            createUser : createUser,
            deleteUserById : deleteUserById,
            updateUser : updateUser,
            findAllFollowing : findAllFollowing,
            findUserByUserId : findUserByUserId,
            addFollower : addFollower,
            deleteFollowingById : deleteFollowingById
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

        function findAllFollowing(userId, callback) {
            var userFollowing = [];
            for(var i=0; i < users.length; i++) {
                if(users[i]._id == userId){
                    var followinglist = users[i].following;
                    console.log(followinglist);
                    for(var j=0; j<followinglist.length; j++) {
                        console.log(followinglist[j]);
                        var following = findUserByUserId(followinglist[j]);
                        userFollowing.push(following);
                    }
                }
            }
            callback(userFollowing);
        }

        function findUserByUserId(userId) {
            console.log("I am here");
            console.log(userId);
            var user = null;
            for(var i=0; i < users.length; i++){
                if(users[i]._id == userId){
                    user = users[i];
                }
            }
            console.log(user);
            return user;
        }

        function addFollower(userId, follower, callback) {
            var followerObject = null;
            for(var i=0; i < users.length; i++){
                if(users[i].username == follower){
                    followerObject = users[i];
                    for(var j=0; j<users.length;j++ ){
                        if(users[j]._id == userId){
                            users[j].following.push(followerObject._id);
                            console.log("New follower list");
                            console.log(users[j].following);
                        }
                    }
                }
            }
            console.log("in function");
            console.log(followerObject);
            callback(followerObject);
        }

        function deleteFollowingById(userId, followerId, callback) {
            var followerList=[];
            for (var i = 0; i < users.length; i++) {

                if (users[i]._id == userId) {

                    followerList = users[i].following;
                    for (var j = 0; j < followerList.length; j++) {
                        if (followerList[j] == followerId) {
                            users[i].following.splice(j, 1);
                        }
                    }
                }
                callback(followerList);
            }
        }
    }
})();