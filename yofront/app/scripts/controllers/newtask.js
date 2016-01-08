'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:NewtaskCtrl
 * @description
 * # NewtaskCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('NewtaskCtrl', function ($scope, $location, $route, ApiService, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    $scope.nt = {
      columnList: [{
        col_name: undefined,
        mapping: [undefined]
      }]
    };

    ApiService.getRawDataTypes(function(res) {
      $scope.rdtList = res.data;
      console.log(res.data);
    }, function(res) {
      console.log(res);
    });

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
      // console.log($scope.nt);
      // return;


      var i;
      var j;
      var resultSet = new Set();

      for(i = 0; i < $scope.nt.columnList.length; i++) {
        var column = $scope.nt.columnList[i];

        for(j = 0; j < column.mapping.length; j++) {
          var rdt = column.mapping[j];
          console.log('rdtid :'+rdt.rdt_id);
          resultSet.add(parseInt(rdt.rdt_id));
        }
      }

      if ($scope.nt.t_name === undefined || $scope.nt.t_name === '') {
        alertify.error('fill the name');
        return;
      }

      if ($scope.nt.description === undefined || $scope.nt.description === '') {
        alertify.error('fill the description');
        return;
      }

      if ($scope.nt.minimum_upload_period === undefined || $scope.nt.minimum_upload_period === '') {
        alertify.error('fill the minimum upload period');
        return;
      }

      // if (selectedRdts.length === 0) {
      //   alertify.error('choose rdt at least one');
      //   return;
      // }

      var selectedRdts = [];
      resultSet.forEach(function(item) {
        selectedRdts.push({id: item});
      });

      console.log(selectedRdts);


      ApiService.postNewTask($scope.nt.t_name, $scope.nt.description, $scope.nt.minimum_upload_period, $scope.nt.task_data_table_name, $scope.nt.columnList, selectedRdts,
      function(res) {
        console.log(res);
        alertify.success('success');
        $location.path('/admin-page');
        // $route.reload();


      }, function(res) {
        console.log(res);
        alertify.error('error');
      });
    };
  });
