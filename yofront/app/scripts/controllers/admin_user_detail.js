'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminUserDetailCtrl
 * @description
 * # AdminUserDetailCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminUserDetailCtrl', function ($scope, $location, SessionService, ApiService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    this.userId = $location.search().uid;
    ApiService.getUserInfo(this.userId,
    function(res) {
        $scope.user = res.data;
        console.log($scope.user);
    }, function(res) {
      console.log('error');
      console.log(res);
    });
  });
