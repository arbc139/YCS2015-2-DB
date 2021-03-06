'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:AdminStatisticsCtrl
* @description
* # AdminStatisticsCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('AdminStatisticsCtrl', function ($scope, $location, SessionService, SESSION_TYPE, ApiService, FileService) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  // check admin!
  SessionService.checkSessionType(SESSION_TYPE.ADMIN);

  var tableId = $location.search().tid; // todo delete

  // ApiService.getUserList(function(res) {
  //   $scope.userList = res.data;
  //   $scope.originalUserList = res.data;
  // }, function(res) {
  //   console.log('getUserList error');
  //   console.log(res.data);
  // });

  ApiService.getTaskInfo(tableId,
    function(res) {
      console.log(res);
      $scope.submitted_file_count = res.data.no_of_submitted_files;
      $scope.passed_file_count = res.data.no_of_passed_files;
      $scope.rdtStatisticsList = res.data.rdt_stats;
      $scope.userList = res.data.submitters;

    }, function(){
      console.log('getTaskInfo error');
    });

    $scope.download = function() {
      ApiService.getTaskCsvString(tableId,
      function(res) {
        FileService.downloadAsCsv(res.data.csv_file);
      }, function() {
        alertify.error('error');
      });

    };




  });
