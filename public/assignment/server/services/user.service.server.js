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
                res.json(user);
            });
       /* var user = req.body;
        res.send(userModel.Create(user));*/
    }

    function getUsers(req, res) {
        var username = req.param("username");
        var password = req.param("password");

        if(username == 'undefined' && password == 'undefined') {
            //res.json(userModel.FindAll)
            userModel
                .FindAll()
                .then(function(user){
                    res.json(user);
                });
        }

        if(username != null && password != null) {
            userModel
                .findUserByCredentials(username, password)
                .then(function(user){
                    res.json(user);
                });
            //res.json(userModel.findUserByCredentials(username, password));
        }

        else {
            userModel
                .findUserByUsername(username)
                .then(function(user){
                    res.json(user);
                });
            //res.json(userModel.findUserByUsername(username));
        }
    }

    function getUserById(req, res) {
        var id = req.params.id;
        userModel
            .FindById(id)
            .then(function(user){
                res.json(user);
            });
        //res.json(userModel.FindById(id));
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel
            .Update(id, user)
            .then(function(user){
                res.json(user);
            });
        //res.json(userModel.Update(id, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userModel
            .Delete(id)
            .then(function(user){
                res.json(user);
            });
        //res.json(userModel.Delete(id));
    }
}