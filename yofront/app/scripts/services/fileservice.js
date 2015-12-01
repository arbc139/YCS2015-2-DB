'use strict';

/**
 * @ngdoc service
 * @name dbfrontappApp.FileService
 * @description
 * # FileService
 * Factory in the dbfrontappApp.
 */
angular.module('dbfrontappApp')
  .factory('FileService', function () {
    // Service logic
    // ...


    // Public API here
    return {
      downloadAsCsv: function(str) {
        window.open("data:text/csv;charset=utf-8," + encodeURIComponent(str));
      }
    };
  });
