(function(){
    angular
        .module("NextReadHuntApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, MovieService) {
        $scope.id = $routeParams.id;
        console.log($routeParams.id);
        MovieService.findMovieByImdbID(
            $scope.id,
            function(response) {
                $scope.movie = response;
            }
        )
    }
})();