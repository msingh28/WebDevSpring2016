"use strict";

(function(){
    angular
        .module("NextReadHuntApp")
        .controller("AdminController", AdminController);

    function AdminController($location, $scope, $rootScope) {
        $scope.removeDiv = function(divId) {
            var elem = document.getElementById(divId);
            elem.parentNode.removeChild(elem);
        }
    }
})();