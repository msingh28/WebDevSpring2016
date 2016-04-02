"use strict";

var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel  = mongoose.model("FieldModel", FieldSchema);

   // var FormSchema = require("./form.schema.server.js")(mongoose);
   // var FormModel  = mongoose.model("FormModel", FormSchema);


    var api = {
        FindAllFields: FindAllFields,
        FindFieldById: FindFieldById,
        DeleteFieldById: DeleteFieldById,
        CreateField: CreateField,
        UpdateField: UpdateField,
        RearrangeFields: RearrangeFields

    };
    return api;

    function FindAllFields(formId) {
        var deferred = q.defer();

        FieldModel.findByFormId(formId, function(err, formId){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(fields);
            }
        });

        return deferred.promise;
        /*var fields = [];
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                fields = forms[i].fields;
            }
        }
        return fields;*/
    }

    function FindFieldById(formId, fieldId) {
        var deferred = q.defer();

        FormModel.findById(formId, fieldId, function(err, fieldId){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(field);
            }
        });

        return deferred.promise;
        /*var fields = null;
        var currentForm = FindById(formId);
        if(currentForm != null) {
            var formFields = currentForm.fields;
            for(var i=0; i <formFields.length; i++) {
                if(formFields[i]._id == fieldId){
                    fields = formFields[i];
                }
            }
        }
        return fields;*/
    }

    function DeleteFieldById(formId, fieldId) {
        var deferred = q.defer();

        FieldModel.remove({formId: formId}, {_id: fieldId}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });
        /*var currentForm = FindById(formId);
        if(currentForm != null){
            var formFields = currentForm.fields;
            for(var i=0; i <formFields.length; i++) {
                if(formFields[i]._id == fieldId) {
                    formFields.splice(i, 1);
                    currentForm.fields = formFields;
                    return Update(currentForm._id,currentForm).fields;
                }
            }
        }*/
    }

    function CreateField(formId, field) {
        var deferred = q.defer();
        var currentForm = FindById(formId);
        if(currentForm != null) {
            FieldModel.create(field, function (err, form) {
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log("Form>");
                    console.log(user);
                    deferred.resolve(user);

                }
            });
        }
        return FormModel.Update(currentForm._id, currentForm).fields;
        /*var currentForm = FindById(formId);
        if(currentForm != null) {
            field._id = uuid.v1();
            currentForm.fields.push(field);
            return Update(currentForm._id, currentForm).fields;
        }*/
    }

    function UpdateField(formId, fieldId, field) {
        var deferred = q.defer();
        var currentForm = FindById(formId);
        field.delete("_id");

        FieldModel.update({_id: fieldId}, {$set: field}, function(err, field) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(field);
            }
        });

        return FormModel.Update(currentForm._id, currentForm).fields;
       /* var currentForm = FindById(formId);
        if(currentForm!=null){
            var formFields = currentForm.fields;
            for(var i=0; i <formFields.length; i++) {
                if(formFields[i]._id == fieldId){
                    formFields[i] = field;
                    currentForm.fields = formFields;
                    return Update(currentForm._id, currentForm).fields;
                }
            }
        }*/
    }

    function RearrangeFields(formId, fields) {
        var deferred = q.defer();
        var currentForm = FindById(formId);
        field.delete("_id");

        FieldModel.update({_id: fieldId}, {$set: field}, function(err, field) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(field);
            }
        });
        return FormModel.Update(currentForm._id, currentForm).fields;
        /*var currentForm = FindById(formId);
        if(currentForm != null){
            currentForm.fields = fields;
            return Update(currentForm._id,currentForm).fields;
        }*/
    }
}
