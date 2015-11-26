'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminManageCtrl
 * @description
 * # AdminManageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminManageCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tableId = $location.search().table_id;
  });
