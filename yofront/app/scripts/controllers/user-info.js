'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:UserInfoCtrl
 * @description
 * # UserInfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('UserInfoCtrl', function ($scope, $route, ApiService, SessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // postModifyUserInfo: function(newId, newPW, newName, newSex, newAddress, newBirth, newPhone, onS, onE) {
    $scope.modifyMyInfo = function() {
      var myUserId = SessionService.getId();

      ApiService.postModifyUserInfo(myUserId, $scope.user.password, $scope.user.name, $scope.user.sex, $scope.user.address, $scope.user.birth, $scope.user.phone,
        function() {
          alertify.success('success');
        }, function() {
          alertify.error('error');
        });
    };
  });
