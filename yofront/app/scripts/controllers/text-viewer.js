'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:TextViewerCtrl
 * @description
 * # TextViewerCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('TextViewerCtrl', function ($scope, CacheService, FileService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var strFromCache = CacheService.getCache();
    CacheService.clearCache();
    $scope.txt = strFromCache.replace(/\\n/g, '<br>');


    $scope.download = function() {
      FileService.downloadAsCsv(strFromCache.replace(/\\n/g, '\n'));
    };

  });
