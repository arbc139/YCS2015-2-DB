'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.sign',
    'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}])
.constant("navbarActiveClass", "active")
.controller("navListCtrl", function ($scope, navbarActiveClass) {
    var selectedNav = null;

    $scope.navList = ["view1", "view2"];
    $scope.signList = [{
        name: "SIGN IN",
        url : "#/sign-in"
    }, {
        name: "SIGN UP",
        url: "#/sign-up"
    }];

    $scope.selectNav = function(newNav) {
        selectedNav = newNav;
    };

    $scope.getNavClass = function (nav) {
        return selectedNav === nav ? navbarActiveClass : "";
    };
});
