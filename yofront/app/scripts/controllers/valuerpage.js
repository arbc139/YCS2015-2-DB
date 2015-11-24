'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:ValuerpageCtrl
 * @description
 * # ValuerpageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('ValuerpageCtrl', function ($location, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // check vauler!
    SessionService.checkSessionType(SESSION_TYPE.VAULER);
  });
