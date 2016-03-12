"use strict";
(function(){
    angular
        .module("NextReadHuntApp")
        .factory("MovieService", movieService);

    function movieService($http) {

        var api = {
            findMovieByTitle: findMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function findMovieByTitle(title, callback) {
            $http.get("https://www.googleapis.com/books/v1/volumes?q="+title+"&key=AIzaSyAx6qr7KcIUkJoHAnJUH-6Ex4xSZHYQKeg")
                .success(callback);
        }

        function findMovieByImdbID(id, callback) {
            $http.get("https://www.googleapis.com/books/v1/volumes/"+id+"?key=AIzaSyAx6qr7KcIUkJoHAnJUH-6Ex4xSZHYQKeg")
                .success(callback);
        }
    }
})();