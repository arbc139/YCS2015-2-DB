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
            .post("http://localhost:3000/login") // todo ask url to dy
            .success(function (data) {
                $scope.signInUserModel.id = "success";
                $scope.signInUserModel.password = "success!!";

            })
            .error(function (data) {
                $scope.signInUserModel.id = "error";
                $scope.signInUserModel.password = "error!!";

                console.log('??');
                console.log(data);
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
