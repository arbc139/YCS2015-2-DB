'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminManageCtrl
 * @description
 * # AdminManageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminManageCtrl', function ($scope, $location, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    $scope.tableId = $location.search().tid;

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
