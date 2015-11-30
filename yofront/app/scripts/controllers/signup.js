'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SignupCtrl', function ($scope) {
    $scope.suUser = {
      id: '',
      password: '',
      password2: undefined,
      sex: '',
      address: '',
      birth: '',
      phone: '',
      role:''
    };
    $scope.signUp = function() {


      var isValidForm = function() {
        return isValidPassword() && isValidSex() && isValidRole();
      };

      var isValidPassword = function() {
        console.log($scope.suUser.password === $scope.suUser.password2);

        return $scope.suUser.password === $scope.suUser.password2;
      };

      var isValidSex = function() {
        var sex = $scope.suUser.sex.toUpperCase();
        return sex === 'M' || sex === 'F';
      };

      var isValidRole = function() {
        var role = $scope.suUser.role.toLowerCase();
        return role === 'submitter' || role ==='valuer';
      };



      if (isValidForm()) {
        // post Api service
      } else {
        var resultStr = '';
        if (!isValidPassword()) {
          resultStr += 'PW checking fail<br>';
        }
        if (!isValidSex()) {
          resultStr += 'SEX checking fail<br>';
        }
        if (!isValidRole()) {
          resultStr += 'ROLE checking fail<br>';
        }
        alertify.error(resultStr);
      }
    };
  });
