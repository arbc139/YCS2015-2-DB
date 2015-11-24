'use strict';

/**
 * @ngdoc service
 * @name dbfrontappApp.SessionService
 * @description
 * # SessionService
 * Factory in the dbfrontappApp.
 */
angular.module('dbfrontappApp')
  .factory('SessionService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
