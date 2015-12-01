'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdmininfoCtrl
 * @description
 * # AdmininfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdmininfoCtrl', function ($scope, $location, ApiService, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    $scope.query = '';

    $scope.change = function(query) {
        ApiService.postModifyAdminPassword(query,
      function() {
        alertify.success('success');
        $location.path('/my-page-redirect');
      }, function() {
        alertify.error('error');
        console.log('error admin password change');
      });
    };
  });
