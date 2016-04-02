"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService) {
        $scope.register = function(user) {
            UserService.createUser(user)
                .then(function(response){
                    console.log("i am in register controller")
                    console.log(response)
                    $rootScope.currentUser = response;
                });
            $location.path('/profile');
        }
    }
})();