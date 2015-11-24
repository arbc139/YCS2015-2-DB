'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:SubmitterpageCtrl
 * @description
 * # SubmitterpageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('SubmitterpageCtrl', function ($scope, $location, SessionService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // check submitter!
    SessionService.checkSessionType(SESSION_TYPE.SUBMITTER);
  });
