'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:AdminpageCtrl
* @description
* # AdminpageCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('AdminpageCtrl', function ($scope, $location, SessionService, ApiService, SESSION_TYPE) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // check admin!
  SessionService.checkSessionType(SESSION_TYPE.ADMIN);

  ApiService.getTaskList(function(res) {
    $scope.taskList = res.data;
  }, function(res) {
    console.log('getTaskList error');
    console.log(res.data);
  });

  ApiService.getUserList(function(res) {
    $scope.userList = res.data;
  }, function(res) {
    console.log('getUserList error');
    console.log(res.data);
  });



})
.controller('AdminPageSearchCtrl', function($scope) {
  $scope.searchCategories = ["id", "role", "age", "task name"];
  $scope.selectedSearch = $scope.searchCategories[0];

  $scope.selectSearch = function(s) {
    $scope.selectedSearch = s;
  };


});
