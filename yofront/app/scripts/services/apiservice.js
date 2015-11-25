'use strict';

/**
 * @ngdoc service
 * @name dbfrontappApp.ApiService
 * @description
 * # ApiService
 * Factory in the dbfrontappApp.
 */
angular.module('dbfrontappApp')
  .factory('ApiService', function ($http) {
    // Service logic
    // ...



    // Public API here
    return {
      getTaskList: function (onS, onE) {
        $http.get('http://db.olaf.kr/api/admin/tasks.json')
        .then(onS, onE);
      },

      getUserList: function(onS, onE) {
        $http.get('http://db.olaf.kr/api/admin/users.json')
        .then(onS, onE);
      }
    };
  });
