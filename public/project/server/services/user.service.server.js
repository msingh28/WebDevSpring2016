"use strict";

module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getUsers);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

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