'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:SubmiiterSubmitCtrl
* @description
* # SubmiiterSubmitCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('SubmitterTaskSubmitCtrl', function ($scope, $location, $route, ApiService) {
  this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  $scope.taskId = $location.search().tid;
  $scope.period = '';
  $scope.inning = '';
  $scope.data = '';
  $scope.rdtId = -1;

  $scope.selectRdt = function(rdtId) {
      $scope.rdtId = parseInt(rdtId);
  };

  ApiService.getRawDataTypes(function(res) {
    $scope.rdtList = res.data;
    console.log(res.data);
  }, function(res) {
    console.log(res);
  });

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
    // todo check validation
    if ($scope.period === '' || $scope.inning === '' || $scope.data === '' || $scope.rdtId === -1) {
      alertify.error('fill in the blanks<br>or select rdt type')
      return;
    }

    // (taskId, rdtId, period, inning, csvStr, onS, onE)
    ApiService.postDataSubmit($scope.taskId, $scope.rdtId, $scope.period, $scope.inning, $scope.data,
    function() {
      alertify.success('success');
      $route.reload();
    }, function() {
      alertify.error('error');
    });
  };
});
