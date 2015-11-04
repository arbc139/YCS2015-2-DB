'use strict';

angular.module('myApp.sign', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-in', {
            templateUrl: 'sign/sign-in.html',
            controller: 'signInCtrl'
        });
    }])
    .controller('signInCtrl', [function($scope) {

    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-up', {
            templateUrl: 'sign/sign-up.html',
            controller: 'signUpCtrl'
        });
    }])
    .controller('signUpCtrl', [function($scope) {

    }])
    ;
