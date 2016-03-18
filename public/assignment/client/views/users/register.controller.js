"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.register = function(user) {
            UserService.createUser(user)
                .then(function(response){
                    $rootScope.currentUser = response;
                });
            $location.path('/profile');
        }
    }
})();