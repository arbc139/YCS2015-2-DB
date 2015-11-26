'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdmininfoCtrl
 * @description
 * # AdmininfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdmininfoCtrl', function (SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);

    
  });
