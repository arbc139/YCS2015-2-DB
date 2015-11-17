'use strict';

angular.module('myApp.sign', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-in', {
            templateUrl: 'sign/sign-in.html',
            controller: 'signInCtrl'
        });
    }])
    .controller('signInCtrl', function($scope, $http) {
        $scope.signInUserModel = {
            'id': '',
            'password': ''
        };

        $scope.signIn = function(id, password) {
            $http
            .post("127.0.0.1:3000/login") // todo ask url to dy
            .success(function (data) {

            })
            .error(function (data) {
                id = 'something went wrong!';
                password = 'sibal!';
            });
        };
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-up', {
            templateUrl: 'sign/sign-up.html',
            controller: 'signUpCtrl'
        });
    }])
    .controller('signUpCtrl', [function($scope) {

    }])
    ;
