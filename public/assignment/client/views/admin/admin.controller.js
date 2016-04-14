"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, UserService) {
        $scope.users=[];
        $scope.selectedUserIndex = null;
        $scope.disable = true;
        var newUser = {};
        $scope.toggle = false;
        $scope.predicate = 'username';
        console.log("in admin controller")
        //console.log($rootScope.currentUser);
        if($rootScope.currentUser != null) {
            UserService.findAllUsers()
                .then(function (response) {
                    $scope.users = response;
                });
        }

        $scope.sort = function(predicate) {
            $scope.toggle = ($scope.predicate === predicate) ? !$scope.toggle : false;
            $scope.predicate = predicate;
        }

        $scope.addNewUser = function(user) {
            UserService.createUser(user)
                .then(function(response) {
                    $scope.users = response;
                    $scope.user={};
                }, function (err) {
                    $scope.error = err;
                });
        }

        $scope.updateUser = function(user) {
            UserService.updateUser(user._id,user)
                .then(function(response){
                        $scope.users = response;
                        $scope.selectedUserIndex = null;
                        $scope.user={};
                        $scope.disable = true;
                    },
                    function(err) {
                        $scope.error = err;
                    });
        }

        $scope.deleteUser = function(userId) {
            UserService.deleteUser(userId)
                .then(function(response) {
                    $scope.users = response;
                }, function (err) {
                    $scope.error = err;
                });
        }

        $scope.selectUser = function(user, index) {
            $scope.selectedUser = user;
            $scope.slectedUserIndex = index;
            $scope.disable = false;

        }

       /* $scope.forms = [];

        if($rootScope.currentUser != null) {
            FormService.findAllFormsForUser($rootScope.currentUser._id)
                .then(function (response) {
                    $scope.forms = response;
                });
        }

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentForm = {};

        $scope.addForm = function() {
            if($scope.formName!=null) {
                currentForm.title = $scope.formName;
                FormService.createFormForUser($rootScope.currentUser._id, currentForm)
                    .then(function(response){
                        $scope.forms.push(response);
                    });
                $scope.formName = null;
                currentForm = {};
            }
        }

        $scope.updateForm = function() {
            if($scope.formName!=null) {
                currentForm = $scope.forms[$scope.selectedFormIndex];
                currentForm.title = $scope.formName;
                FormService.updateFormById(currentForm._id, currentForm)
                    .then(function (response){
                        $scope.forms[$scope.selectedFormIndex] = response;
                    });
                currentForm = {};
                $scope.formName = null;
                $scope.selectedFormIndex = null;
                $scope.disable = true;
            }
        }

        $scope.deleteForm = function(index) {
            currentForm = $scope.forms[index];
            FormService.deleteFormById(currentForm._id)
                .then(function(response){
                    $scope.forms.splice(index,1);
                });
            $scope.selectedFormIndex = null;
            $scope.formName = null;
        }

        $scope.selectForm = function(index) {
            $scope.selectedFormIndex = index;
            $scope.formName = $scope.forms[index].title;
            $scope.disable = false;
        }*/
    }
})();