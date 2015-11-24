'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:ValuerinfoCtrl
 * @description
 * # ValuerinfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('ValuerinfoCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check vauler!
    SessionService.checkSessionType(SESSION_TYPE.VAULER);
  });
