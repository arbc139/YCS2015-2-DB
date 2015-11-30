'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:SubmitterpageCtrl
* @description
* # SubmitterpageCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('SubmitterpageCtrl', function ($scope, $location, SessionService, ApiService, SESSION_TYPE) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // check submitter!
  SessionService.checkSessionType(SESSION_TYPE.SUBMITTER);


  // begin appliable task
  ApiService.getTaskList(function(res) { // todo remove
    $scope.appliableTaskList = res.data;
  }, function(res) {
    console.log('getTaskList error');
    console.log(res.data);
  });

  $scope.apply = function(tableId) {
    console.log(tableId);
    alertify.confirm('개미를 죽입시다. (개미는 나의 원수) 우리가 2년 동안 달팽이를 키웠는데 어떤 불개미 새끼가 달팽이를 죽였습니다. 개미를 죽입시다. 달팽이는 아주 착했습니다. 달팽이는 아직 안 죽었는데, 싸가지 없는 불개미가 물었습니다. 조심하십시오. 씨발, 개새끼, 싸가지 없는 놈',
    function(){
      alertify.success('Ok');
    },
    function(){
      alertify.error('Cancel');
    });
  };
  // end appliable task


  // begin submittable task
  ApiService.getTaskList(function(res) { // todo remove
    $scope.submittableTask = res.data;
  }, function(res) {
    console.log('getTaskList error');
    console.log(res.data);
  });

  $scope.submit = function(tableId) {
    console.log("submit" + tableId);
  };

  $scope.info = function(tableId) {
    console.log("info" + tableId);
  };

  // end submittable task




});
