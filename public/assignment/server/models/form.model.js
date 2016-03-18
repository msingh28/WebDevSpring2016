"use strict";

module.exports = function(app) {

    var forms = require("./form.mock.json");
    var uuid = require('node-uuid');

    var api = {
        Create: Create,
        FindAll: FindAll,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        FindAllFields: FindAllFields,
        FindFieldById: FindFieldById,
        DeleteFieldById: DeleteFieldById,
        CreateField: CreateField,
        UpdateField: UpdateField

    };
    return api;

    function Create(form, userId) {
        form._id = uuid.v1();
        form.userId = userId;
        forms.push(form);
        return form;
    }

    function FindAll(userId) {
        var userForms = [];
        for(var i=0; i < forms.length; i++) {
            if(forms[i].userId == userId){
                userForms.push(forms[i]);
            }
        }
        return userForms;
    }

    function FindById(id) {
        var form=null;
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id==id){
                form = forms[i];
            }
        }
        return form;
    }

    function Update(id, form) {
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id==id) {
                forms[i] = form;
            }
        }
        return form;
    }

    function Delete(id) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }

    function findFormByTitle(title) {
        var form = null;
        for(var i=0; i < forms.length; i++) {
            if(forms[i].title == title){
                form = forms[i];
            }
        }
        return form;
    }

    function FindAllFields(formId) {
        var fields = [];
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                fields = forms[i].fields;
            }
        }
        return fields;
    }

    function FindFieldById(formId, fieldId) {
        var field = null;
        for(var i=0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                var fields = forms[i].fields;
                for(var j = 0; j< fields.length; j++) {
                    if(fields[i]._id == fieldId) {
                        field = fields[i];
                    }
                }
            }
        }
        return field;
    }

    function DeleteFieldById(formId, fieldId) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                for(var j = 0; j< forms[i].fields.length; j++) {
                    if(forms[i].fields[j]._id == fieldId) {
                        forms[i].fields.splice(j, 1);
                    }
                }

            }
        }
        return forms;
    }

    function CreateField(formId, field) {
        field._id = uuid.v1();
        for(var i = 0; i < forms.length; i++) {
            if(forms[i]._id == formId) {
                forms[i].fields.push(field);
            }
        }
        return field;
    }

    function UpdateField(formId, fieldId, field) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == formId) {
                for(var j = 0; j< forms[i].fields.length; j++) {
                    if(forms[i].fields[j]._id == fieldId) {
                        forms[i].fields[j] = field;
                    }
                }

            }
        }
        return forms;
    }
}
