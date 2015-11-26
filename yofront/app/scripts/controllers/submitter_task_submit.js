'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SubmiiterSubmitCtrl
 * @description
 * # SubmiiterSubmitCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SubmitterTaskSubmitCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tableId = $location.search().tid;
  });
