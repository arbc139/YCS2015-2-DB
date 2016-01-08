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

    $scope.taskId = $location.search().tid;

    ApiService.getAdminManageJSON($scope.taskId,
    function(res) {
      $scope.userList = res.data.submitters;
      $scope.rdtList = res.data.rdts;
      console.log(res.data);
    }, function() {
      console.log('getAdminManageJSON error');
    });

    $scope.decide = function(user, isAccept) {
      // alertify.success('ddd ' + isAccept);
      ApiService.postTaskApplyDecision($scope.taskId, user.id, isAccept,
      function(res) {
        console.log(res);
        $route.reload();
      }, function(res) {
        console.log(res);
      });
    };

    // ApiService.getRawDataTypes(function(res) {
    //   $scope.rdtList = res.data;
    // }, function() {
    //   console.log('getRawDataTypes error');
    // });
  });
