"use strict";

(function(){
    angular
        .module("NextReadHuntApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    redirectTo: "/search"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
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
                    controller: "BooksController"
                })
                .when("/following", {
                    templateUrl: "views/following/following.view.html",
                    controller: "FollowingController"
                })
                .when("/reviews", {
                    templateUrl: "views/reviews/reviews.view.html",
                    controller: "ReviewsController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();