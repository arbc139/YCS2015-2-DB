'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminPageNewRdtCtrl
 * @description
 * # AdminPageNewRdtCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminPageNewRdtCtrl', function ($scope, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.columnList = [''];
    $scope.rdtName = '';

    $scope.plusplus = function() {
      if (isAllFilled()) {
        $scope.columnList.push('');
      } else {
        alertify.error('fill in the blanks');
      }
    };

    $scope.send = function() {
      if (isAllFilled() && $scope.rdtName !== '') {
        alertify.success('ok');
      } else {
        alertify.error('fill in the blanks');
      }
    };

    var isAllFilled = function() {
      var i;
      for (i = 0; i < $scope.columnList.length; i++) {
        var tempStr = $scope.columnList[i];
        if (tempStr === '') {
          return false;
        }
      }
      return true;
    };
  });
