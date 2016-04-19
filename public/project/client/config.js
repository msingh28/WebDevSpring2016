"use strict";

(function(){
    angular
        .module("NextReadHuntApp")
        .config(function($routeProvider, $httpProvider){
            $routeProvider
                .when("/home", {
                    redirectTo: "/search",
                    resolve: {
                        loggedin: checkCurrentUser
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: 'model'
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: 'model'
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    resolve: {
                        loggedin: checkAdmin
                    }
                })
                .when("/search", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/search/:title", {
                    templateUrl: "views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/detail/:id", {
                    templateUrl: "views/search/detail.view.html",
                    controller: "DetailController"
                })
                .when("/books", {
                    templateUrl: "views/books/books.view.html",
                    controller: "BooksController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/following", {
                    templateUrl: "views/following/following.view.html",
                    controller: "FollowingController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when("/reviews", {
                    templateUrl: "views/reviews/reviews.view.html",
                    controller: "ReviewsController",
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user[0].roles.indexOf('admin') != -1)
            {
                $rootScope.currentusr = user[0];
                deferred.resolve();
            }
        });

        return deferred.promise;
    };
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
console.log("In checkLoggedIn");
        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated

            if (user !== '0')
            {
                $rootScope.currentUser = user[0];
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };
    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentusr = user[0];

            }
            deferred.resolve();

        });

        return deferred.promise;
    };
})();