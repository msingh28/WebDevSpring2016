"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.login = function(user) {
            UserService.findUserByCredentials(user.username,user.password,
                function(response){
                    $rootScope.currentUser = response;
                    $location.path('/profile');
                });
        }
    }
})();