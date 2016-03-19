"use strict";

var uuid = require('node-uuid');

module.exports = function() {

    var forms = require("./form.mock.json");


    var api = {
        Create: Create,
        FindAll: FindAll,
        FindFormsByUserId: FindFormsByUserId,
        FindById: FindById,
        Update: Update,
        Delete: Delete,
        findFormByTitle: findFormByTitle,
        FindAllFields: FindAllFields,
        FindFieldById: FindFieldById,
        DeleteFieldById: DeleteFieldById,
        CreateField: CreateField,
        UpdateField: UpdateField,
        RearrangeFields: RearrangeFields

    };
    return api;

    function Create(form, userId) {
        form._id = uuid.v1();
        form.userId = userId;
        form.fields = [];
        forms.push(form);
        return form;
    }

    function FindAll() {
        return userForms;
    }

    function FindFormsByUserId(userId){
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
                return form;
            }
        }
    }

    function Delete(id) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id == id) {
                forms.splice(i, 1);
                return forms;
            }
        }
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
            return null;
        }
        return null;
    }

    function CreateField(formId, field) {
        var currentForm = FindById(formId);
        console.log(currentForm);
        if(currentForm != null){
            field._id = uuid.v1();
            console.log(field._id);
            currentForm.fields.push(field);
            return Update(currentForm._id, currentForm).fields;
        }
        return null;
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
            return null;
        }
        return null;
    }

    function RearrangeFields(formId, fields){
        var currentForm = FindById(formId);
        if(currentForm != null){
            currentForm.fields = fields;
            return Update(currentForm._id,currentForm).fields;
        }
        return null;
    }
}
