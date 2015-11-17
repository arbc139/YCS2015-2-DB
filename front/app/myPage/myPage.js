'use strict';

angular.module('myApp.myPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/myPage', {
    templateUrl: 'myPage/view1.html',
    controller: 'myPageCtrl'
  });
}])

.controller('myPageCtrl', function($scope) {
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
