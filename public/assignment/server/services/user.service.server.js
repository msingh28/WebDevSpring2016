"use strict";

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
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
    }
}