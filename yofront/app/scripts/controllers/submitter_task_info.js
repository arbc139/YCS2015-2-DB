'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SubmitterInfoCtrl
 * @description
 * # SubmitterInfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SubmitterTaskInfoCtrl', function ($scope, $location, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.taskId = $location.search().tid;

    ApiService.getSubmitterTaskInfo($scope.taskId,
    function(res) {
      var d = res.data;
      $scope.submitted_file_count = d.no_of_submitted_file;
      $scope.passed_file_count = d.no_of_passed_file;
      $scope.pdsfs_by_rdt = d.pdsfs_by_rdt;

    }, function() {
      alertify.error('error');
    });

  


  });
