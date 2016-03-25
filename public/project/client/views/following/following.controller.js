"use strict";

(function()
{
    angular
        .module("NextReadHuntApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($rootScope, $scope, UserService) {
        $scope.following = [];

        if($rootScope.currentUser != null) {
            UserService.findAllFollowing($rootScope.currentUser._id,
                function (response) {
                    $scope.following = response;
                });
        }

        $scope.selectedFormIndex = null;
        $scope.disable = true;
        var currentFollower;

        $scope.addFollower = function() {
            if($scope.followerId!=null) {
                currentFollower = $scope.followerId;
                UserService.addFollower($rootScope.currentUser._id, currentFollower,
                    function(response){
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
            UserService.deleteFollowingById($rootScope.currentUser._id, currentFollower._id,
                function(response){
                    $scope.following.splice(index,1);
                });
            $scope.selectedFormIndex = null;
            $scope.formName = null;
        }
    }
})();