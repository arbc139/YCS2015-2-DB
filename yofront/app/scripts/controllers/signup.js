'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SignupCtrl', function ($scope, $location, ApiService, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

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
         return isValidPassword() && isValidSex() && isValidRole() && isValidBirth();
      };

      var isValidPassword = function() {
        return $scope.suUser.password === $scope.suUser.password2;
      };

      var isValidSex = function() {
        var sex = $scope.suUser.sex.toUpperCase();
        return sex === 'M' || sex === 'F';
      };

      var isValidBirth = function() {
        var birth = $scope.suUser.birth.match(/^(\d{4})\-(\d{1,2})\-(\d{1,2})$/);
        return birth !== null;
      };

      var isValidRole = function() {
        var role = $scope.suUser.role.toLowerCase();
        return role === 'submitter' || role ==='valuer';
      };


      var validate = function() {
        var pass = true;

        var isValidString = function(str) {
          return str !== undefined && str !== '';
        };

        pass = pass && isValidString($scope.suUser.id);
        pass = pass && isValidString($scope.suUser.password);
        pass = pass && isValidString($scope.suUser.password2);
        pass = pass && isValidString($scope.suUser.name);
        pass = pass && isValidString($scope.suUser.sex);
        pass = pass && isValidString($scope.suUser.address);
        pass = pass && isValidString($scope.suUser.birth);
        pass = pass && isValidString($scope.suUser.phone);
        pass = pass && isValidString($scope.suUser.role);

        pass = pass && isValidForm();

        return pass;
      };

      if (validate()) {
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
            console.log(res);
            alertify.success('Success');
            SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
            $location.path('/sign-in');
          }, function(res) {
            console.log('post signUpjs onE');
            console.log(res);
            alertify.error('Error');
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

        if (resultStr === '') {
          alertify.error('fill in the blanks');
        } else {
          alertify.error(resultStr + 'and other BLANK forms');
        }
      }
    };
  });
