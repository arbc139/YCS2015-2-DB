'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:SigninCtrl
* @description
* # SigninCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('SigninCtrl', function ($scope, $http, $location, SESSION_TYPE, SessionService) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  $scope.signInUserModel = {
    'str_id': '',
    'password': ''
  };

  $scope.SessionService = SessionService;
  $scope.SESSION_TYPE = SESSION_TYPE;

  console.log(SessionService.getCurrentSessionType());

  $scope.signIn = function(id, password) {
    //  console.log('signList: '+$scope.signList);
    // 다른 컨트롤러의 스코프에 접근할 수 없구나.
    // 컨트롤러끼리의 통신을 어떻게 하지
    // http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs
    // Using $rootScope.$broadcast and $scope.$on for a PubSub communication.

    var config = {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };
    $http
    .post('http://db.olaf.kr/api/login', $scope.signInUserModel, config)
    .success(function (data) {
      console.log('success ');
      console.log(data);

      var updateSession = function (si, i) {
        console.log("updateSession: " + si + " , " + i);
        SessionService.setStrId(si);
        SessionService.setId(i);
      };

      if (data.role === 'admin') {
        SessionService.setCurrentSessionType(SESSION_TYPE.ADMIN);
        updateSession(data.str_id, data.id);

        $location.path('admin-page');
      } else if (data.role === 'valuer') {
        SessionService.setCurrentSessionType(SESSION_TYPE.VALUER);
        updateSession(data.str_id, data.id);

        $location.path('valuer-page');
      } else if (data.role === 'submitter') {
        SessionService.setCurrentSessionType(SESSION_TYPE.SUBMITTER);
        updateSession(data.str_id, data.id);

        $location.path('submitter-page');
      } else if (data.role === 'wrong') {
        SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
        alert('wrong id or pw\ntry again!');
      } else {
        alert('sibal??? ? ?sdfljasdlfjasdf');
      }
    })
    .error(function (data) {
      console.log('fail ' + data);
      alert("server error!\nsee the debugging console");
    });

  }; // end of $scope.signIn();

  $scope.logOut = function() {
    SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
  }
});
