"use strict";

(function(){
    angular
        .module("NextReadHuntApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, MovieService) {
        $scope.search = search;
        $scope.title = $routeParams.title;

        if($scope.title) {
            search($scope.title);
        }

        function search(title) {
            $location.url("/search/"+$scope.title);
            MovieService.findMovieByTitle(
                title,
                function(response){
                    $scope.data = response;
                });
        }
    }
})();