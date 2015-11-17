'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.myPage',
    'myApp.view2',
    'myApp.sign',
    'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
    // $routeProvider.otherwise({redirectTo: '/view1'});
    $routeProvider.when('/', {
      templateUrl: 'sign/please-sign-in.html'
    //   controller: 'View1Ctrl'
    });
}])
// .config(['$locationProvider', function($location) {
//   $location.html5Mode(true); //now there won't be a hashbang within URLs for browers that support HTML5 history
// }])
.constant("navbarActiveClass", "active")
.controller("navListCtrl", function ($scope, navbarActiveClass) {
    var selectedNav = null;

    $scope.navList = [{
        name: "My Page"
    }, {
        name: "Temp View (View2)"
    }];
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
