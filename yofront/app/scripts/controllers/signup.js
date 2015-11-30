'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SignupCtrl', function ($scope, ApiService) {
    $scope.suUser = {
      id: '',
      password: '',
      password2: undefined,
      name: '',
      sex: '',
      address: '',
      birth: '',
      phone: '',
      role:''
    };
    $scope.signUp = function() {


      var isValidForm = function() {
         return isValidPassword()
         && isValidSex()
         && isValidRole()
         && isValidBirth();
      };

      var isValidPassword = function() {
        console.log($scope.suUser.password === $scope.suUser.password2);

        return $scope.suUser.password === $scope.suUser.password2;
      };

      var isValidSex = function() {
        var sex = $scope.suUser.sex.toUpperCase();
        return sex === 'M' || sex === 'F';
      };

      var isValidBirth = function() {
        var birth = $scope.suUser.birth.match(/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/);
        return birth !== null;
      }

      var isValidRole = function() {
        var role = $scope.suUser.role.toLowerCase();
        return role === 'submitter' || role ==='valuer';
      };



      if (isValidForm()) {
        // post Api service
        // postSignUp: function(id, password, uName, sex, address, birth, phone, role, onS, onE)
        ApiService.postSignUp(
          $scope.suUser.id,
          $scope.suUser.password,
          $scope.suUser.name,
          $scope.suUser.sex,
          $scope.suUser.address,
          $scope.suUser.birth,
          $scope.suUser.phone,
          $scope.suUser.role,
          function(res) {
            console.log('post signUp.js onS');
          }, function(res) {
            console.log('post signUpjs onE');
        });
        
      } else {
        var resultStr = '';
        if (!isValidPassword()) {
          resultStr += 'PW checking fail<br>';
        }
        if (!isValidSex()) {
          resultStr += 'SEX checking fail<br>';
        }
        if (!isValidBirth()) {
          resultStr += 'BIRTH checking fail<br>';
        }
        if (!isValidRole()) {
          resultStr += 'ROLE checking fail<br>';
        }
        alertify.error(resultStr);
      }
    };
  });
