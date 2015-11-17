'use strict';

angular.module('myApp.sign', ['ngRoute'])
// .factory("Secure", function($resource) {
//     return $resource("/api/record/:id", { id: "@id" },
//     {
//         'show':    { method: 'GET', isArray: false },
//         'update':  { method: 'PUT' },
//         'destroy': { method: 'DELETE' }
//     }
//     );
// })
.factory("SessionService", function(SESSION_TYPE) {
    var currentSession = {
        id: '',
        type: SESSION_TYPE.WRONG
    };

    var getCurrentSessionType = function () {
        return currentSession.type;
    };

    var setCurrentSessionType = function(ss) {
        currentSession.type = ss;
    };

    return {
            getCurrentSessionType: getCurrentSessionType,
            setCurrentSessionType: setCurrentSessionType
    };
})
.constant("SESSION_TYPE", {
    ADMIN: 'session_type_admin',
    VALUER: 'session_type_valuer',
    SUBMITTER: 'session_type_submitter',
    WRONG: 'session_type_wrong'
})
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/sign-in', {
        templateUrl: 'sign/sign-in.html',
        controller: 'signInCtrl'
    });
}])
.controller('signInCtrl', function($scope, $http, SESSION_TYPE, SessionService) {
    $scope.signInUserModel = {
        'id': '',
        'password': ''
    };

    console.log(SessionService.getCurrentSessionType());

    $scope.signIn = function(id, password) {
        if (id === 'admin' && password === 'admin') {
            SessionService.setCurrentSessionType(SESSION_TYPE.ADMIN);

        } else if (id === 'valuer' && password === 'v') {
            SessionService.setCurrentSessionType(SESSION_TYPE.VALUER);
        } else if (id === 'submitter' && password === 's') {
            SessionService.setCurrentSessionType(SESSION_TYPE.SUBMITTER);
        } else {
            SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
        }
        /*
        $http
        .post("http://ror.olaf.kr/login") // todo ask url to dy
        .success(function (data) {
            console.log(data);

        })
        .error(function (data) {
            // $scope.signInUserModel.id = "error";
            // $scope.signInUserModel.password = "error!!";

            console.log('??');
            console.log(data);
        });
        */
        console.log(SessionService.getCurrentSessionType());
    };
})
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/sign-up', {
        templateUrl: 'sign/sign-up.html',
        controller: 'signUpCtrl'
    });
}])
.controller('signUpCtrl', [function($scope) {

}])
;
