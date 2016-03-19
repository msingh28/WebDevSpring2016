"use strict";

module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body;
        res.send(userModel.Create(user));
    }

    function getUsers(req, res) {
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
    }

    function getUserById(req, res) {
        var id = req.params.id;
        res.json(userModel.FindById(id));
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(userModel.Update(id, user));
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        res.json(userModel.Delete(id));
    }
}