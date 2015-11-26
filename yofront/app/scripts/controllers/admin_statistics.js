'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminStatisticsCtrl
 * @description
 * # AdminStatisticsCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminStatisticsCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tableId = $location.search().table_id;
  });
