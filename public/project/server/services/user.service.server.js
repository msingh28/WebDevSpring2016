"use strict";
var passport      = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    var auth = authorized;
    app.post  ('/api/project/login', passport.authenticate('local'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.post  ('/api/project/admin/user',     auth, createUser);
    app.get   ('/api/project/loggedin',       loggedin);
    app.get   ('/api/project/admin/user',     auth, findAllUsers);
    app.put   ('/api/project/user/:id', auth, updateUser);
    app.delete('/api/project/admin/user/:id', auth, deleteUser);
    app.get("/api/project/user/:id/following", auth, getFollowing);
    app.put("/api/project/user/:id/following", auth, updateFollowing);
    app.delete("/api/project/user/:id/:followingId", auth, deleteFollowing);
    app.get("/api/project/user/:id/books", getBooks);
    app.get("/api/project/user/:id/reviews", getReviews);
    app.delete("/api/project/user/:userId/books/:bookId", deleteBookById);
    app.get("/api/project/user/:id", getUserById);
    app.post("/api/project/user/:userId/review", updateReview);
    app.delete("/api/project/user/:userId/review/:reviewId", deleteReview);

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

   /* function createUser(req, res) {
        var user = req.body;
        res.send(userModel.Create(user));
    }*/

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
        /*if(isAdmin(req.user)) {
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
        }*/

    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .Delete(req.params.id)
                .then(
                    function(user){
                        return userModel.FindAll();
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
        /*if(isAdmin(req.user)) {
            userModel
                .Delete(req.params.id)
                .then(
                    function (user) {
                        return userModel.findAllUsers();
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }*/
    }

    function updateUser(req, res) {
        var newUser = req.body;

        /*if(typeof newUser.roles == "string") {
         newUser.roles = newUser.roles.split(",");
         }*/

        userModel
            .Update(req.params.id, newUser)
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

    function updateReview(req, res){
        var newreview = req.body;
    userModel.FindById(user._id)
            .then(
                function(user){
                    var index = user.indexOf(newreview._id);
                    user.reviews.splice(index, 1);
                    user.reviews.push(newreview);
                    res.json(user);

                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getFollowing(req, res) {
        var userId = req.params.id;
        console.log(userId);

        userModel.Following(userId)
            .then(
                function (following){
                    var followingUsers=[];
                    console.log("model following response")
                    console.log(following);
                    var temp=[];
                    for(var i =0; i <following.length; i++){
                        console.log(following[i]);
                        userModel.FindById(following[i])
                            .then(
                                function (user){
                                   //console.log(user);
                                    temp.push(user);
                                    followingUsers = temp;
                                   // console.log("in for");
                                   //console.log(followingUsers);
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                    }
                    console.log(followingUsers);
                    res.json(followingUsers);
                },
                function () {
                    res.status(400).send(err);
                }
            )
        //console.log(followingUsers);
       // res.json(followingUsers);
        /*.then(
            function(){
                console.log(followingUsers);
                console.log(res.json(followingUsers));
                //return followingUsers;
                res.json(followingUsers);
            },
            function(err){
                res.status(400).send(err);
            }
        );*/
        //res.json(userModel.Following(userId));
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

    function getBooks(req, res) {
        var userId = req.params.id;
        console.log("In server services")
        /*console.log(userModel.getBooks(userId));*/
        userModel.getBooks(userId)
            .then(
                function(books){
                    //console.log(books);
                    res.json(books)
                },
                function(err){
                    res.status(400).send(err);
                }
            )
        //res.json(userModel.getBooks(userId));
    }

    function getReviews(req, res) {
        var userId = req.params.id;
        userModel.getReviews(userId)
            .then(
                function(reviews){
                    //console.log(books);
                    res.json(reviews)
                },
                function(err){
                    res.status(400).send(err);
                }
            )
        //res.json(userModel.getBooks(userId));
    }

    function deleteBookById(req, res) {
        var userId = req.params.userId;
        var bookId = req.params.bookId;
        userModel.deleteBook(userId, bookId)
            .then(
                function(books){
                    console.log(books);
                    res.json(books)
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function deleteReview(req, res) {
        var userId = req.params.userId;
        var reviewId = req.params.reviewId;
        userModel.deleteReview(userId, reviewId)
            .then(
                function(review){
                    res.json(review);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
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
                console.log("In get User by Id");
                console.log(user);
                res.json(user[0]);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }
        console.log("In create user");
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
                                    return userModel.FindAll();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.FindAll();
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
            );
        /*if(isAdmin(req.user)) {
            var newUser = req.body;
            if (newUser.roles && newUser.roles.length > 1) {
                newUser.roles = newUser.roles.split(",");
            } else {
                newUser.roles = ["user"];
            }

            // first check if a user already exists with the username
            userModel
                .findUserByUsername(newUser.username)
                .then(
                    function (user) {
                        // if the user does not already exist
                        if (user == null) {
                            // create a new user
                            return userModel.Create(newUser)
                                .then(
                                    // fetch all the users
                                    function () {
                                        return userModel.findAllUsers();
                                    },
                                    function (err) {
                                        res.status(400).send(err);
                                    }
                                );
                            // if the user already exists, then just fetch all the users
                        } else {
                            return userModel.findAllUsers();
                        }
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                )
        }*/
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

    function isAdmin(req) {
        // console.log(user[0].roles);
        ///console.log(req);
        var user = req[0];
        //console.log("in user service");

        if(user.roles.indexOf("admin") > -1) {
            return true;
        }
        else{
            return false;
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