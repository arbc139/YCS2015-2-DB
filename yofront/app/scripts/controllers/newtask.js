'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:NewtaskCtrl
 * @description
 * # NewtaskCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('NewtaskCtrl', function ($scope, $location, ApiService, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    ApiService.getRawDataTypes(function(res) {
      $scope.rdtList = res.data;
      console.log(res.data);
    }, function(res) {
      console.log(res);
    });

    $scope.submit = function() {
      var i;
      var selectedRdts = [];
      for(i = 0; i < $scope.rdtList.length; i++) {
        var rdt = $scope.rdtList[i];
        if (rdt.hasOwnProperty('checked')) {
          if (rdt.checked === true) {
            selectedRdts.push(rdt);
          }
        }
      }

      if (selectedRdts.length === 0) {
        alertify.error('choose rdt at least one');
        return;
      }


      ApiService.postNewTask($scope.nt.t_name, $scope.nt.description, $scope.nt.minimum_upload_period, $scope.nt.task_data_table_schema, selectedRdts,
      function(res) {
        console.log(res);
        alertify.success('success');
        $location.path('/admin-page');

      }, function(res) {
        console.log(res);
        alertify.error('error');
      })
    };
  });
