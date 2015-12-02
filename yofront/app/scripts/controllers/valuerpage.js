'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:ValuerpageCtrl
 * @description
 * # ValuerpageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('ValuerpageCtrl', function ($scope, $location, ApiService, SessionService, CacheService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // check vauler!
    SessionService.checkSessionType(SESSION_TYPE.VALUER);

    ApiService.getNotYetValuedParsingDataSequenceFileList(function(res) {
      console.log(res);
      $scope.pdsfList = res.data;
    }, function() {
      alertify.error('error');
    });

    $scope.goToTextViewer = function(i) {
      CacheService.setCache($scope.pdsfList[i].data_blob);
      $location.path('/text-viewer');
    };
  });
