"use strict";

(function() {
    angular
        .module("NextReadHuntApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        forms = [
            {"_id": "111", "title": "Harry Potter", "reviewId": [1, 2]},
            {"_id": "222", "title": "Pip",     "reviewId": [3, 4]},
            {"_id": "333", "title": "The Lost Symbol",      "reviewId": []}
        ];


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for(var i=0; i < forms.length; i++) {
                if(forms[i].userId == userId){
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            for(var i=0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms.splice(i, 1);
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var temp = null;
            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i] = newForm;
                    temp =  forms[i];
                }
            }
            callback(temp);
        }
    }
})();