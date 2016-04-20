"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($routeParams, $rootScope, $scope, UserService) {
        $scope.following = [];
        var targetProfileId = $routeParams.userId;
        if($rootScope.currentUser){
            if($rootScope.currentUser._id == targetProfileId){
                $scope.currentuser = $rootScope.currentUser;
                $scope.disableProfile = false;
                UserService.findAllFollowing($rootScope.currentUser._id)
                    .then(function (response) {
                        console.log(response);
                        $scope.following = response;
                    });

            }else {
                UserService.findUserById(targetProfileId)
                    .then(function (response) {
                        console.log(response);
                        $scope.currentuser = response;
                    })
                    .then(function (response) {
                        UserService.findAllFollowing($scope.currentuser._id)
                            .then(function (response) {
                                console.log(response);
                                $scope.following = response;
                            });
                    });
            }

        }

        /*if($rootScope.currentUser != null) {
            UserService.findAllFollowing($rootScope.currentUser._id)
                .then(function (response) {
                    console.log(response);
                    $scope.following = response;
                });
        }*/

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentFollower;

        $scope.addFollower = function() {
            if($scope.followerId!=null) {
                currentFollower = $scope.followerId;
                UserService.addFollower($rootScope.currentUser._id, currentFollower)
                    .then(function(response){
                        if(response!=null) {
                            $scope.following.push(response);
                        }
                    });
                $scope.followerId = null;
                currentFollower = null;
            }
        }

        $scope.deleteFollower = function(index) {
            currentFollower = $scope.following[index];
            UserService.deleteFollowingById($rootScope.currentUser._id, currentFollower._id)
                .then(function(response){
                    $scope.following.splice(index,1);
                });
            $scope.selectedFormIndex = null;
            $scope.formName = null;
        }
    }
})();