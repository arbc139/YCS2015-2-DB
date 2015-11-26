'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminUserDetailCtrl
 * @description
 * # AdminUserDetailCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminUserDetailCtrl', function ($scope, $location, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);
    
    $scope.userId = $location.search().uid;
  });
