'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SubmitterInfoCtrl
 * @description
 * # SubmitterInfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SubmitterTaskInfoCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tableId = $location.search().tid;
  });
