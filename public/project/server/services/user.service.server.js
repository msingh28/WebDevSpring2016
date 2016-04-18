"use strict";
var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    var auth = authorized;
    app.post  ('/api/project/login', passport.authenticate('local'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.post  ('/api/project/admin/user',     auth, isAdmin, createUser);
    app.get   ('/api/project/loggedin',       loggedin);
    app.get   ('/api/project/admin/user',     auth, isAdmin, findAllUsers);
    app.get   ('/api/project/admin/user/:id',     auth, isAdmin, getUserById)
    app.put   ('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/admin/user/:id', auth, isAdmin, deleteUser);
    app.get("/api/project/user/:id/following", auth, getFollowing);
    app.put("/api/project/user/:id/following", auth, updateFollowing);
    app.delete("/api/project/user/:id/:followingId", auth, deleteFollowing);

    /*app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/user/:id/following", getFollowing);
    app.put("/api/project/user/:id/following", updateFollowing);
    app.delete("/api/project/user/:id/:followingId", deleteFollowing);*/

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .FindById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        console.log("I am inside server user service")
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var newUser = req.body;
        console.log("register user service");
        console.log(newUser);
        newUser.roles = ['user'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        console.log(user);
                        console.log("user exist");
                        res.json(null);
                    } else {
                        console.log("user does not exist");
                        return userModel.Create(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        res.send(userModel.Create(user));
    }

    function findAllUsers(req, res) {
        // console.log(req.user);
        userModel
            .FindAll()
            .then(
                function (users) {
                    res.json(users);
                },
                function () {
                    res.status(400).send(err);
                }
            );

    }

    function deleteUser(req, res) {

        userModel
            .removeUser(req.params.id)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function updateUser(req, res) {
        var newUser = req.body;

        /*if(typeof newUser.roles == "string") {
         newUser.roles = newUser.roles.split(",");
         }*/

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    if(req.session.passport.user._id == req.params.id) {
                        return user;
                    }
                    else {
                        userModel.findAllUsers();
                    }

                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getFollowing(req, res) {
        var userId = req.params.id;
        res.json(userModel.Following(userId));
    }

    function updateFollowing(req, res) {
        var userId = req.params.id;
        var following = req.param("following");
        res.json(userModel.updateFollowing(userId, following));
    }

    function deleteFollowing(req, res) {
        var userId = req.params.userId;
        var followingId = req.params.followerId;
        res.json(userModel.deleteFollowing(userId, followingId));
    }

    /*function getUsers(req, res) {
        var username = req.param("username");
        var password = req.param("password");

        if(username == 'undefined' && password == 'undefined') {
            res.json(userModel.FindAll)
        }

        if(username != null && password != null) {
            res.json(userModel.findUserByCredentials(username, password));
        }

        else {
            res.json(userModel.findUserByUsername(username));
        }
    }*/

    function getUserById(req, res) {
        var id = req.params.id;
        userModel
            .FindById(id)
            .then(function(user){
                res.json(user[0]);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.Create(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    /*function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(userModel.Update(id, user));
    }*/

    /*function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.Delete(id));
    }*/

    function isAdmin(req, res, next) {
        // console.log(user[0].roles);
        var user = req.user;
        console.log("in user service");
        console.log(req.user);
        if(user[0].roles.indexOf("admin") > -1) {
            next();
        }
        else{
            res.send(403);
        }
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


}