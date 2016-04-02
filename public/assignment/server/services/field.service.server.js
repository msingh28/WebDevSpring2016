"use strict";

module.exports = function(app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteField);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateField);
    app.put("/api/assignment/form/:formId/field", RearrangeFields);

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel
            .CreateField(formId, field)
            .then(function(field){
                //console.log("created field");
               // console.log(field.fields)
                res.json(field.fields);
            });
       // res.json(formModel.CreateField(formId, field));
    }

    function getFormFields(req, res) {
        var formId = req.params.formId;
        fieldModel
            .FindAllFields(formId)
            .then(function(field){
                res.json(field.fields);
            });
       // res.json(formModel.FindAllFields(formId));
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .FindFieldById(formId, fieldId)
            .then(function(field){
                console.log("reponse of getfieldBy id server");
                console.log(field);
                res.json(field);
            });
        //res.json(formModel.FindFieldById(formId, fieldId));
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        //console.log(req);
        console.log("fieldId for the one updating")
        //console.log(req);
        console.log(fieldId);
        fieldModel
            .UpdateField(formId, fieldId, field)
            .then(function(field){
                res.json(field.fields);
            });
        //res.json(formModel.UpdateField(formId, fieldId, field));
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldModel
            .DeleteFieldById(formId, fieldId)
            .then(function(field){
                res.json(field.fields);
            });
        //res.json(formModel.DeleteFieldById(formId, fieldId));
    }

    function RearrangeFields(req,res){
        var formId = req.params.formId;
        var fields = req.body;
        fieldModel
            .RearrangeFields(formId, fields)
            .then(function(field){
                res.json(field.fields);
            });
        //res.json(formModel.RearrangeFields(formId, fields));
    }
}