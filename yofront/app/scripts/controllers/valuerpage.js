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

    if (SessionService.getCurrentSessionType() !== SESSION_TYPE.VALUER) {
        alert("you are not valuer, plaese sign in");
        $location.path('sign-in');
    }
  });
