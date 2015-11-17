'use strict';

angular.module('myApp.sign', ['ngRoute'])
// .factory("Secure", function($resource) {
//     return $resource("/api/record/:id:password", { id: "@id" },
//     {
//         'show':    { method: 'GET', isArray: false },
//         'update':  { method: 'PUT' },
//         'destroy': { method: 'DELETE' }
//     }
//     );
// })
.factory("olafSession", function() {
    var currentSession = "wrong";

    var getCurrentSession = function () {
        return currentSession;
    };

    var setCurrentSession = function(ss) {
        currentSession = ss;
    };

    return {
            getCurrentSession: getCurrentSession,
            setCurrentSession: setCurrentSession
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
.controller('signInCtrl', function($scope, $http, SESSION_TYPE) {
    $scope.signInUserModel = {
        'id': '',
        'password': ''
    };

    $scope.signIn = function(id, password) {
        $http
        .post("http://ror.olaf.kr/login") // todo ask url to dy
        .success(function (data) {
            // $scope.signInUserModel.id = "success";
            // $scope.signInUserModel.password = "success!!";
            console.log(data);

        })
        .error(function (data) {
            $scope.signInUserModel.id = "error";
            $scope.signInUserModel.password = "error!!";

            console.log('??');
            console.log(data);
        });
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
