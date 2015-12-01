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

    var userId = $location.search().uid;

    $scope.result = {};

    ApiService.getUserInfo(userId,
    function(res) {
        var user = res.data.user;
        if (user === undefined) {
          $scope.result.role = 'admin';
          user = {};
          user.role = 'admin';
        } else {
          $scope.result.role = user.role;
        }
        if (user.role === 'submitter') {
          $scope.result.id = user.str_id;
          $scope.result.taskList = res.data.tasks;
        } else if (user.role === 'valuer') {
          $scope.result.id = user.str_id;
          $scope.result.fileList = res.data.files;
        } else if (user.role === 'admin') {
          alertify.error('no admin!');
          $location.path('/my-page-redirect');
        } else {
          console.error('what the?');
          console.log(res.data);

          return;
        }

        // $scope.result = resultStr;
        console.log(res.data);
    }, function(res) {
      console.log('error');
      console.log(res);
    });
  });
