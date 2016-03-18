"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.login = function(user) {
            UserService.findUserByCredentials(user.username,user.password)
                .then(function(response){
                    $rootScope.currentUser = response;
                    $location.path('/profile');
                });
        }
    }
})();