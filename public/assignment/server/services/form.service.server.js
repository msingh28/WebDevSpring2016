"use strict";

module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getForms);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.get("/api/assignment/form?formTitle=formTitle", getFormByTitle);

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel
            .Create(form, userId)
            .then(function(user){
                res.json(form);
            });
        /*var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.Create(form, userId));*/
    }

    function getForms(req, res) {
        var userId = req.params.userId;
        formModel
            .FindFormsByUserId(userId)
            .then(function(user){
                res.json(user);
            });
        /*var userId = req.params.userId;
        res.json(formModel.FindFormsByUserId(userId));*/
    }

    function getFormById(req, res) {
        var id = req.params.formId;
        formModel
            .FindById(id)
            .then(function(form){
                res.json(form);
            });
       /* var formId = req.params.formId;
        res.json(formModel.FindById(formId));*/
    }

    function updateForm(req, res) {
        var id = req.params.id;
        var form = req.body;
        userModel
            .Update(id, form)
            .then(function(user){
                res.json(user);
            });
        /*var id = req.params.id;
        var form = req.body;
        res.json(formModel.Update(id, form));*/
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        //var id = req.params.id;
        formModel
            .Delete(formId)
            .then(function(user){
                res.json(user);
            });
        /*var formId = req.params.formId;
        res.json(formModel.Delete(formId));*/
    }

    function getFormByTitle(req, res){
        var formTitle = req.param("formTitle");
        formModel
            .findFormByTitle(formTitle)
            .then(function(form){
                res.json(form);
            });
       /* var formTitle = req.param("formTitle");
        res.json(formModel.findFormByTitle(formTitle));*/
    }
}