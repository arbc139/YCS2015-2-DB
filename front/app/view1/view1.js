'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope) {
    var i;
    $scope.taskApplyList = [{
        taskName: "task-1"
    }, {
        taskName: "dfdfdf"
    }];
    for(i = 0; i < 10; i++) {
        $scope.taskApplyList.push({
            taskName: "task " + i

        });
    }

    console.log("task apply list " + $scope.taskApplyList);
    for(i = 0; i < 10; i++) {
        console.log($scope.taskApplyList[i]);
    }

});
