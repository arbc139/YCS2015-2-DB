'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:SubmiiterSubmitCtrl
* @description
* # SubmiiterSubmitCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('SubmitterTaskSubmitCtrl', function ($scope, $location, ApiService) {
  this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.tableId = $location.search().tid;

  $scope.upload = function() {
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onloadend = function(e){
      console.log(e);
      $scope.data = e.target.result;
      $("#btn-submit").prop('disabled', false);
      $scope.$apply();
    };
    r.readAsText(f, 'UTF-8');
    // r.readAsBinaryString(f);
  };
  $scope.submit = function() {
    ApiService.postTestSubmit($scope.data,
    function() {
      console.log('success');
    }, function() {
      console.log('error');
    });
  };
});