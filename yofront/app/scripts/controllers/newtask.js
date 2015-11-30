'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:NewtaskCtrl
 * @description
 * # NewtaskCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('NewtaskCtrl', function (SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);
  });
