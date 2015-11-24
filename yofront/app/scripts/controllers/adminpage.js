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
    if (SessionService.getCurrentSessionType() !== SESSION_TYPE.ADMIN) {
        alert("you are not admin, plaese sign in");
        $location.path('sign-in');
        // setTimeout("$('html').injector().get('$location').path('sign-in');$('html').scope().$apply();", 100);
    }

  });
