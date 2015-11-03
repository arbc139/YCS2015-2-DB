'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])
  .constant("navbarActiveClass", "active")
  .controller("navListCtrl", function ($scope, navbarActiveClass) {
    var selectedNav = null;

    $scope.navList = ["view1", "view2"];

    $scope.selectNav = function(newNav) {
      selectedNav = newNav;
    };

    $scope.getNavClass = function (nav) {
      return selectedNav === nav ? navbarActiveClass : "";
    };
  });
