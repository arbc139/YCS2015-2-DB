'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:AdminpageCtrl
 * @description
 * # AdminpageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('AdminpageCtrl', function ($scope, $location, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // check admin!
    SessionService.checkSessionType(SESSION_TYPE.ADMIN);
    

  });
