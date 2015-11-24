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

    if (SessionService.getCurrentSessionType() !== SESSION_TYPE.SUBMITTER) {
        alert("you are not submitter, plaese sign in");
        $location.path('sign-in');
    }
  });
