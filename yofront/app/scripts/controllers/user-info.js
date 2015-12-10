'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:UserInfoCtrl
* @description
* # UserInfoCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('UserInfoCtrl', function ($scope, $location, $route, ApiService, SessionService, SESSION_TYPE) {
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

    // 탈퇴
    $scope.ssaeGoodBba = function() {
      // definition
      var signOut = function() {
        ApiService.deleteUser(function() {
          alertify.success('good bye~');
        }, function() {
          alertify.error('error');
        });
      };

      var resetSession = function() {
        SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
        SessionService.setId(undefined);
        SessionService.setStrId(undefined);
        $location.path('/');
      };

      // run
      alertify.confirm('정말로 탈퇴하시겠습니까?',
        function() {
          signOut();
          resetSession();
        }, function() {
          alertify.error('canceld');
      });
  };
});
