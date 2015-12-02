'use strict';

/**
 * @ngdoc service
 * @name dbfrontappApp.CacheService
 * @description
 * # CacheService
 * Factory in the dbfrontappApp.
 */
angular.module('dbfrontappApp')
  .factory('CacheService', function () {
    // Service logic
    // ...

    var cache = undefined;

    // Public API here
    return {
      getCache: function () {
        return cache;
      }, setCache: function(c) {
        cache = c;
      }, clearCache: function() {
        cache = undefined;
      }
    };
  });
