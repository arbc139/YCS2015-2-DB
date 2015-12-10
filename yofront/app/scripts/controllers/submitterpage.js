'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:SubmitterpageCtrl
* @description
* # SubmitterpageCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('SubmitterpageCtrl', function ($scope, $location, $route, SessionService, ApiService, SESSION_TYPE) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // check submitter!
  SessionService.checkSessionType(SESSION_TYPE.SUBMITTER);

  // begin appliable task
  // ApiService.getTaskList(function(res) { // todo remove
  //   $scope.appliableTaskList = res.data;
  // }, function(res) {
  //   console.log('getTaskList error');
  //   console.log(res.data);
  // });

  ApiService.getSubmitterScore(function(res) {
    console.log(res);
    $scope.score = res.data.value_score;
  }, function() {
    alertify.error('error getting submitter\'s score');
  });

  ApiService.getAppliableTaskList(function(res) {
    console.log(res);
    $scope.appliableTaskList = res.data;
  }, function() {
    alertify.error('error');
  });

  $scope.apply = function(tableId) {
    console.log(tableId);
    alertify.confirm('살어리 살어리랏다 쳥산(靑山)에 살어리랏다 멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)에 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라',
    function(){
      ApiService.postApplyTask(tableId,
      function() {
        alertify.success('success');
        $route.reload();
      }, function() {
        alertify.error('error');
      });
    },
    function(){
      alertify.error('canceled');
    });
  };
  // end appliable task


  // begin submittable task

  // ApiService.getTaskList(function(res) { // todo remove
  //   $scope.submittableTask = res.data;
  // }, function(res) {
  //   console.log('getTaskList error');
  //   console.log(res.data);
  // });

  ApiService.getSubmittableTaskList(function(res) {
    $scope.submittableTask = res.data;
  }, function() {
    alertify.error('error');
  });

  $scope.submit = function(tableId) {
    console.log("submit" + tableId);
  };

  $scope.info = function(tableId) {
    console.log("info" + tableId);
  };

  // end submittable task




});
