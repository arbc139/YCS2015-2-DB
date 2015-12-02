'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminPageRdtListCtrl
 * @description
 * # AdminPageRdtListCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminPageRdtListCtrl', function ($scope, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    ApiService.getRawDataTypes(function(res) {
      $scope.rdtList = res.data;
    }, function() {
      console.log('getRawDataTypes error');
    });
  });
