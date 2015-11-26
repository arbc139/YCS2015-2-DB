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
    $scope.originalUserList = res.data;
  }, function(res) {
    console.log('getUserList error');
    console.log(res.data);
  });


  // Search start

  $scope.searchCategories = ["id", "role", "age", "sex", "task name"];
  $scope.selectedSearch = $scope.searchCategories[0];

  $scope.selectSearch = function(s) {
    $scope.selectedSearch = s;
  };

  $scope.search = function(query) {
    if (query === '') {
      $scope.userList = $scope.originalUserList;
      return;
    }
    if ($scope.selectedSearch === $scope.searchCategories[0]) {
      // case 'id'

      var tempArray = [];

      for (var i in $scope.originalUserList) {
        var user = $scope.originalUserList[i];

        if (user.str_id === query) {
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[1]) {
      // case 'role'

      var tempArray = [];

      for (var i in $scope.originalUserList) {
        var user = $scope.originalUserList[i];

        if (user.role === query) {
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[2]) {
      //case 'age'


      var tempArray = [];

      for (var i in $scope.originalUserList) {
        var user = $scope.originalUserList[i];

        console.log(user.age);
        console.log(query);

        if (user.age === parseInt(query)) {
          console.log('push');
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[3]) {
      // case 'sex'

      var tempArray = [];

      for (var i in $scope.originalUserList) {
        var user = $scope.originalUserList[i];

        if (user.sex === query) {
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[4]) {
      // case 'task name'

      var tempArray = [];

      for (var i in $scope.originalUserList) {
        var user = $scope.originalUserList[i];
        for (var j in user.participate_tasks) {
          var task = user.participate_tasks[j];
          // console.log("task_name");
          // console.log(task_name);
          if (task.name == query) {
            tempArray.push(user);
          }
        }
      }

      $scope.userList = tempArray;

    } else {
      alert('sibal?');
    }
  }

  // search end

});
