'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:NewtaskCtrl
 * @description
 * # NewtaskCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('NewtaskCtrl', function ($scope, ApiService, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    ApiService.getRawDataTypes(function(res) {
      $scope.rdtList = res.data;
      console.log(res.data);
    }, function(res) {
      console.log();
    });

  });
