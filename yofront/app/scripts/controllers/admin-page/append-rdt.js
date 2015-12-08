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

    var taskId = $location.search().tid;
    console.log('dddd');

    ApiService.getTaskRdtAppendInfo(taskId,
    function(res) {
      var i;
      var j;

      $scope.rdtList = res.data.all_rdts;

      var taskRdtList = res.data.task_rdts;

      for (i = 0; i < $scope.rdtList.length; i++) {
        var rdt = $scope.rdtList[i];
          for (j = 0; j < taskRdtList.length; j++) {
            var containingRdt = taskRdtList[j];
            if (rdt.id === containingRdt.id) {
              rdt.already = true;
            }
          }
      }

      console.log($scope.rdtList);

    }, function() {
      alertify.error('error');
    });

    $scope.submit = function() {
      var newRdtList = [];
      var i;

      for (i = 0; i < $scope.rdtList.length; i++) {
        var rdt = $scope.rdtList[i];

        if (!rdt.hasOwnProperty('already') && rdt.checked === true) {
          newRdtList.push(rdt.id);
        }
      }


      ApiService.postTaskRdtAppend(taskId, newRdtList,
      function(res) {
        $route.reload();
      }, function() {
        alertify.error('error');
      });
    };
  });
