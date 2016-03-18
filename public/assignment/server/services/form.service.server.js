"use strict";

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getForms);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);



    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        res.send(formModel.Create(user));
    }

    function getForms(req, res) {
        var userId = req.params.userId;
        res.json(formModel.FindAll(userId));
    }


    function getFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.FindById(formId));
    }

    function updateForm(req, res) {
        var id = req.params.id;
        var form = req.body;
        res.json(formModel.Update(id, form));
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        res.json(formModel.Delete(id));
    }
}