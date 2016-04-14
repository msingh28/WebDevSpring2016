"use strict";
var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {
   // var userModel = require("../../models/user/user.model.server.js")();
    var auth = authorized;
    app.post  ('/api/assignment/login', passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout',         logout);
    app.post  ('/api/assignment/register',       register);
    app.post  ('/api/assignment/admin/user',     auth, isAdmin, createUser);
    app.get   ('/api/assignment/loggedin',       loggedin);
    app.get   ('/api/assignment/admin/user',     auth, isAdmin, findAllUsers);
    app.put   ('/api/assignment/user/:id', auth, updateUser);
    app.delete('/api/assignment/admin/user/:id', auth, isAdmin, deleteUser);


    /*app.post("/api/assignment/user", createUser);
     app.get("/api/assignment/user", getUsers);
     app.get("/api/assignment/user/:id", getUserById);
     app.put("/api/assignment/user/:id", updateUser);
     app.delete("/api/assignment/user/:id", deleteUser);*/

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

    /*function findAllUsers(req, res) {
        userModel
            .FindAll()
            .then(function(user){
                res.json(user);
            })
    }*/

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
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

    function findAllUsers(req, res) {
       // console.log(req.user);
        if(isAdmin(req.user)) {
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
        } else {
            res.status(403);
        }
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

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
        } else {
            res.status(403);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;
        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
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
                        return userModel.createUser(newUser)
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

    function isAdmin(user) {
       // console.log(user[0].roles);
        if(user[0].roles.indexOf("admin") > -1) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


    /*function createUser(req, res) {
        userModel
            .Create(req.body)
            .then(function(user){
                console.log("in user.service.server")
                console.log(user);
                res.json(user);
            });
    }

    function getUsers(req, res) {
        var username = req.param("username");
        var password = req.param("password");

        if(username == 'undefined' && password == 'undefined') {
            userModel
                .FindAll()
                .then(function(user){
                    res.json(user[0]);
                });
        }

        if(username != null && password != null) {
            userModel
                .findUserByCredentials(username, password)
                .then(function(user){
                    res.json(user[0]);
                });
        }

        else {
            userModel
                .findUserByUsername(username)
                .then(function(user){
                    res.json(user[0]);
                });
        }
    }

    function getUserById(req, res) {
        var id = req.params.id;
        userModel
            .FindById(id)
            .then(function(user){
                res.json(user[0]);
            });
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;

        userModel
            .Update(id, user)
            .then(function(user){
                res.json(user[0].body);
            });
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userModel
            .Delete(id)
            .then(function(user){
                res.json(user[0].body);
            });
    }*/
}