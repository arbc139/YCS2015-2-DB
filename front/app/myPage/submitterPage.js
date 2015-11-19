'use strict';

angular.module('myApp.submitterPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/submitter-page', {
    templateUrl: 'myPage/submitterPage.html',
    controller: 'submitterPageCtrl'
  });
}])

.controller('submitterPageCtrl', function($scope, $location,
    SessionService, SESSION_TYPE) {

    if (SessionService.getCurrentSessionType() !== SESSION_TYPE.SUBMITTER) {
        alert("you are not submitter, plaese sign in");
        $location.path('sign-in');
    }

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
