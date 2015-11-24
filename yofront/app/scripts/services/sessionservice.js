'use strict';

/**
* @ngdoc service
* @name dbfrontappApp.SessionService
* @description
* # SessionService
* Factory in the dbfrontappApp.
*/
angular.module('dbfrontappApp')
.constant('SESSION_TYPE', {
    ADMIN: 'session_type_admin',
    VALUER: 'session_type_valuer',
    SUBMITTER: 'session_type_submitter',
    WRONG: 'session_type_wrong'
})
.factory('SessionService', function ($location, SESSION_TYPE) {
  // Service logic
  // ...

  var currentSession = {
    id: -1,
    str_id: '',
    // type: SESSION_TYPE.WRONG
    type: SESSION_TYPE.ADMIN

  };

  // Public API here
  return {
    getCurrentSessionType: function () {
        return currentSession.type;
    },
    setCurrentSessionType: function(ss) {
        currentSession.type = ss;
    },
    getStrId: function () {
        return currentSession.str_id;
    },
    setStrId: function (si) {
        currentSession.str_id = si;
    },
    getId: function () {
        return currentSession.id;
    },
    setId: function(i) {
        currentSession.id = i;
    },
    checkSessionType: function(targetSessionType) {
      if (currentSession.type !== targetSessionType) {
          alert("you don't have authorization, plaese sign in");
          $location.path('sign-in');
      }
    }
  };
});
