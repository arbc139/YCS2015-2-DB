'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminManageCtrl
 * @description
 * # AdminManageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminManageCtrl', function ($scope, $location, $route, ApiService, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    var tableId = $location.search().tid;

    ApiService.getAdminManageJSON(tableId,
    function(res) {
      $scope.userList = res.data.submitters;
      console.log(res.data.submitters);
    }, function(res) {
      console.log('getAdminManageJSON error');
    });

    ApiService.getRawDataTypes(function(res) {
      $scope.rdtList = res.data;
    }, function(res) {
      console.log('getRawDataTypes error');
    });

    $scope.decide = function(user, isAccept) {
      // alertify.success('ddd ' + isAccept);
      ApiService.postTaskApplyDecision(tableId, user.id, isAccept,
      function(res) {
        console.log(res);
        $route.reload();
      }, function(res) {
        console.log(res);
      });
    };

    // $scope.userList = [
    //   {
    //     id:1,
    //     str_id: 'dfdf',
    //     name: 'n',
    //     sex: 'f',
    //     address: 'ad',
    //     birth: '56',
    //     role: 'rr',
    //     score: 1
    //   }
    // ];
    //
    // $scope.rdtList = [
    //   {
    //     id: 1,
    //     name: 'lg'
    //   },
    //   {
    //     id: 1,
    //     name: 'lg'
    //   },
    //   {
    //     id: 1,
    //     name: 'lg'
    //   }
    // ];
  });
