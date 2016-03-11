"use strict";

(function(){
    angular
        .module("NextReadHuntApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope) {
        $scope.reset = function() {
            $rootScope.currentUser = null;
        }
    }
})();