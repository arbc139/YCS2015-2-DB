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
    $scope.userList.splice(0, 1);
    $scope.originalUserList = res.data;
  }, function(res) {
    console.log('getUserList error');
    console.log(res.data);
  });


  // Search start

  $scope.searchCategories = ["id", "role", "age", "sex", "task name"];
  $scope.selectedSearch = $scope.searchCategories[0];


  $scope.alertSchema = function(schemaStr) {
    alertify
    .okBtn('닫기')
    .alert(JSON.stringify(schemaStr));
    alertify.reset();
  };

  $scope.selectSearch = function(s) {
    $scope.selectedSearch = s;
  };

  $scope.search = function(query) {
    if (query === '') {
      $scope.userList = $scope.originalUserList;
      return;
    }

    var tempArray = [];
    var i;
    var user;

    if ($scope.selectedSearch === $scope.searchCategories[0]) {
      // case 'id'

      for (i in $scope.originalUserList) {
        user = $scope.originalUserList[i];

        if (user.str_id === query) {
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[1]) {
      // case 'role'

      for (i in $scope.originalUserList) {
        user = $scope.originalUserList[i];

        if (user.role === query) {
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[2]) {
      //case 'age'

      for (i in $scope.originalUserList) {
        user = $scope.originalUserList[i];

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

      for (i in $scope.originalUserList) {
        user = $scope.originalUserList[i];

        if (user.sex === query) {
          tempArray.push(user);
        }
      }

      $scope.userList = tempArray;

    } else if ($scope.selectedSearch === $scope.searchCategories[4]) {
      // case 'task name'

      for (i in $scope.originalUserList) {
        user = $scope.originalUserList[i];
        for (var j in user.participate_tasks) {
          var task = user.participate_tasks[j];
          // console.log("task_name");
          // console.log(task_name);
          if (task.t_name === query) {
            tempArray.push(user);
          }
        }
      }

      $scope.userList = tempArray;

    } else {
      window.alert('sibal?');
    }
  };

  // search end

});
