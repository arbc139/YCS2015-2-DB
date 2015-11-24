'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SubmitterinfoCtrl
 * @description
 * # SubmitterinfoCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SubmitterinfoCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // check submitter!
    SessionService.checkSessionType(SESSION_TYPE.SUBMITTER);
  });
