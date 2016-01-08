'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminPageAppendRdtCtrl
 * @description
 * # AdminPageAppendRdtCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminPageAppendRdtCtrl', function ($scope, $location, $route, ApiService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.taskId = $location.search().tid;
    console.log('dddd');

    $scope.nt = {
      columnList: [{
        col_name: undefined,
        mapping: [undefined]
      }]
    };

    // ApiService.getTaskRdtAppendInfo(taskId,
    // function(res) {
    //   var i;
    //   var j;
    //
    //   $scope.rdtList = res.data.all_rdts;
    //
    //   var taskRdtList = res.data.task_rdts;
    //
    //   for (i = 0; i < $scope.rdtList.length; i++) {
    //     var rdt = $scope.rdtList[i];
    //       for (j = 0; j < taskRdtList.length; j++) {
    //         var containingRdt = taskRdtList[j];
    //         if (rdt.id === containingRdt.id) {
    //           rdt.already = true;
    //         }
    //       }
    //   }
    //
    //   console.log($scope.rdtList);
    //
    // }, function() {
    //   alertify.error('error');
    // });

    $scope.plusplus = function(index) {
      console.log('index');
      console.log(index);
      $scope.nt.columnList[index].mapping.push(undefined);
    };

    $scope.plusplusBig = function() {
      $scope.nt.columnList.push({
        name: undefined,
        mapping: [undefined]
      });
    };

    $scope.submit = function() {
      var i;
      var j;
      var resultSet = new Set();

      for(i = 0; i < $scope.nt.columnList.length; i++) {
        var column = $scope.nt.columnList[i];

        for(j = 0; j < column.mapping.length; j++) {
          var rdt = column.mapping[j];
          resultSet.add(parseInt(rdt.rdt_id));
        }
      }

      var selectedRdts = [];
      resultSet.forEach(function(item) {
        selectedRdts.push(item);
      });

      console.log($scope.nt);
      ApiService.postTaskRdtAppend($scope.taskId, selectedRdts, $scope.nt.columnList,
      function() {
        alertify.success('success');
        $location.path('admin-page/manage?tid=' + $scope.taskId);
      }, function() {
        alertify.error('error');
      });

    };
  });
