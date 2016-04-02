"use strict";

var uuid = require('node-uuid');
var q = require("q");

module.exports = function(db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel  = mongoose.model("FormModel", FormSchema);


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindFormsByUserId: FindFormsByUserId,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle
        /*FindAllFields: FindAllFields,
        FindFieldById: FindFieldById,
        DeleteFieldById: DeleteFieldById,
        CreateField: CreateField,
        UpdateField: UpdateField,
        RearrangeFields: RearrangeFields*/

    };
    return api;

    function Create(form, userId) {
        var deferred = q.defer();
        form.userId = userId;
        FormModel.create(form, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log("Form>");
                console.log(form);
                deferred.resolve(form);
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });
        return deferred.promise;
        /*form._id = uuid.v1();
        form.userId = userId;
        form.fields = [];
        forms.push(form);
        return form;*/
    }

    function FindAll() {
        var deferred = q.defer();

        FormModel.find(function(err, forms){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
       /* return userForms;*/
    }

    function FindFormsByUserId(userId){
        var deferred = q.defer();

        FormModel.find({userId: {$in: userId}}, function(err, forms){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
        /*var userForms = [];
        for(var i=0; i < forms.length; i++) {
            if(forms[i].userId == userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;*/
    }


    function FindById(id) {
        var deferred = q.defer();
        FormModel.find({_id: {$in: id}}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
        /*var form=null;
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id==id){
                form = forms[i];
            }
        }
        return form;*/
    }

    function Update(id, form) {
        var deferred = q.defer();

        //var temp = user.delete("_id");
        delete form._id;

        FormModel.update({_id: id}, {$set: form}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                console.log(form);
                deferred.resolve(form);
                form.save(function(err, updatedForm) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(updatedForm);
                    }
                });
            }
        });

        return deferred.promise;
        /*var deferred = q.defer();

        form.delete("_id");

        FormModel.update({_id: id}, {$set: form}, function(err, form) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;*/

    }

    function Delete(id) {
        var deferred = q.defer();

        FormModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
        /*var deferred = q.defer();

        FormModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;*/
       /* for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id) {
                forms.splice(i, 1);
                return forms;
            }
        }*/
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.find({title: {$in: title}}, function (err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
        /*var form = null;
        for(var i=0; i < forms.length; i++) {
            if(forms[i].title == title){
                form = forms[i];
            }
        }
        return form;*/
    }

    /*function FindAllFields(formId) {
        var form = FindById(formId);
        return form.fields;
       /!* var fields = [];
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                fields = forms[i].fields;
            }
        }
        return fields;*!/
    }

    function FindFieldById(formId, fieldId) {
        var fields = null;
        var currentForm = FindById(formId);
        if(currentForm != null) {
            var formFields = currentForm.fields;
            for(var i=0; i <formFields.length; i++) {
                if(formFields[i]._id == fieldId){
                    fields = formFields[i];
                }
            }
        }
        return fields;
    }

    function DeleteFieldById(formId, fieldId) {
        var currentForm = FindById(formId);
        if(currentForm != null){
            var formFields = currentForm.fields;
            for(var i=0; i <formFields.length; i++) {
                if(formFields[i]._id == fieldId) {
                    formFields.splice(i, 1);
                    currentForm.fields = formFields;
                    return Update(currentForm._id,currentForm).fields;
                }
            }
        }
    }

    function CreateField(formId, field) {
        var currentForm = FindById(formId);
        if(currentForm != null) {
            field._id = uuid.v1();
            currentForm.fields.push(field);
            return Update(currentForm._id, currentForm).fields;
        }
    }

    function UpdateField(formId, fieldId, field) {
        var currentForm = FindById(formId);
        if(currentForm!=null){
            var formFields = currentForm.fields;
            for(var i=0; i <formFields.length; i++) {
                if(formFields[i]._id == fieldId){
                    formFields[i] = field;
                    currentForm.fields = formFields;
                    return Update(currentForm._id, currentForm).fields;
                }
            }
        }
    }

    function RearrangeFields(formId, fields) {
        var currentForm = FindById(formId);
        if(currentForm != null){
            currentForm.fields = fields;
            return Update(currentForm._id,currentForm).fields;
        }
    }*/
}
