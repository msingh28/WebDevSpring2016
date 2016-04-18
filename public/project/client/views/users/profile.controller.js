"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, $location, UserService) {
        $scope.currentuser = $rootScope.currentUser;

        $scope.update = function(user) {
            UserService.updateUser(user._id,user)
                .then(function(response){
                    $rootScope.currentUser = response;
                },
                    function(err) {
                        $scope.error = err;
                    });
            $location.path('/profile');
        }
    }
})();