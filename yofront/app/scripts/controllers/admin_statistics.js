'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminStatisticsCtrl
 * @description
 * # AdminStatisticsCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminStatisticsCtrl', function ($scope, $location, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.tableId = $location.search().tid; // todo delete

    // ApiService.getUserList(function(res) {
    //   $scope.userList = res.data;
    //   $scope.originalUserList = res.data;
    // }, function(res) {
    //   console.log('getUserList error');
    //   console.log(res.data);
    // });

    $scope.submitted_file_count = 100;
    $scope.passed_file_count = 99;

    $scope.userList = [
      {
        id:1,
        str_id: 'dfdf',
        name: 'n',
        sex: 'f',
        address: 'ad',
        birth: '56',
        role: 'rr',
        score: 1
      }
    ];

    $scope.rdtList = [
      {
        id: 1,
        name: 'lg'
      },
      {
        id: 1,
        name: 'lg'
      },
      {
        id: 1,
        name: 'lg'
      }
    ];

    

  });
