'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:NavCtrl
* @description
* # NavCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.constant('NavbarActiveClass', 'active')
.controller('NavCtrl', function (
    $scope, $location,
    NavbarActiveClass) {
    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
});
