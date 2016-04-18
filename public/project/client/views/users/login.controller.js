"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {
        $scope.login = function(user) {
            if(user){
                UserService.login(user)
                    .then(function(response){
                        console.log("in login controller")
                        console.log(response);
                        $rootScope.currentUser = response;
                        //console.log(response);
                        $location.url('/profile');
                    },
                        function(err) {
                            $scope.error = err;
                        });
            }

        }
    }
})();