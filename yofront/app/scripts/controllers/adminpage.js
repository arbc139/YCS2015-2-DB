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

    $scope.taskList = [];
    ApiService.getTaskList(function(res) {
      console.log(res);
        $scope.taskList = res.data;
        console.log(res.data);
    }, function(data) {
      console.log('getTaskList error');
        console.log(data);
    });
    console.log($scope.taskList);
    // [{
    //   id: 1,
    //   name: 'name1',
    //   description: 'description1',
    //   minup: 'minup1',
    //   tdtname: 'td1',
    //   tdtschema: 'tds1',
    // },{
    //   id: 1,
    //   name: 'name1',
    //   description: 'description1',
    //   minup: 'minup1',
    //   tdtname: 'td1',
    //   tdtschema: 'tds1',
    // },{
    //   id: 1,
    //   name: 'name1',
    //   description: 'description1',
    //   minup: 'minup1',
    //   tdtname: 'td1',
    //   tdtschema: 'tds1',
    // }];

    $scope.userList = [{
      id: 1,
      str_id: 'id',
      name: 'name',
      sex: 'f',
      address: 'adrs',
      bdate: '5/6',
      role: 'valuer',
      score: 9.4
    },{
      id: 1,
      str_id: 'id',
      name: 'name',
      sex: 'f',
      address: 'adrs',
      bdate: '5/6',
      role: 'valuer',
      score: 9.4
    },{
      id: 1,
      str_id: 'id',
      name: 'name',
      sex: 'f',
      address: 'adrs',
      bdate: '5/6',
      role: 'valuer',
      score: 9.4
    }];


  });
