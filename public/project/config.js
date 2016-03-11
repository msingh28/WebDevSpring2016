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
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController"
                })
                .when("/fields",{
                    templateUrl: "views/forms/form-fields.view.html"
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
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();