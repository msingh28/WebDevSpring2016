"use strict";

(function() {
    angular
        .module("NextReadHuntApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, UserService) {
        $scope.users=[];
        $scope.selectedUserIndex = null;
        $scope.disable = true;
    console.log($rootScope.currentUser);
        $scope.add = add;
        $scope.remove = remove;
        var newUser = {};
        //$scope.toggle = false;
        //$scope.predicate = 'username';
        console.log("in admin controller")
        //console.log($rootScope.currentUser);

        function init() {
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

        function remove(user)
        {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }
        function add(user)
        {
            UserService
                .createUser(user)
                .then(handleSuccess, handleError);
        }
        function handleSuccess(response) {
            $scope.users = response;
        }

        function handleError(error) {
            $scope.error = error;
        }
       /* $scope.addNewUser = function(user) {
            UserService.createUser(user)
                .then(function(response) {
                    $scope.users = response;
                    $scope.user={};
                }, function (err) {
                    $scope.error = err;
                });
        }*/

        /*remove = function(userId) {
            UserService.deleteUserById(userId)
                .then(function(response) {
                    console.log(response);
                    $scope.users = response;
                }, function (err) {
                    $scope.error = err;
                });
        }*/

        /*$scope.selectUser = function(user, index) {
            $scope.selectedUser = user;
            $scope.slectedUserIndex = index;
            $scope.disable = false;

        }*/

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