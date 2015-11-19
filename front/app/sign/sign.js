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
.controller('signInCtrl', function($scope, $http, $location, SESSION_TYPE, SessionService) {
    $scope.signInUserModel = {
        'str_id': '',
        'password': ''
    };

    console.log(SessionService.getCurrentSessionType());

    $scope.signIn = function(id, password) {
        console.log('signList: '+$scope.signList);
        // 다른 컨트롤러의 스코프에 접근할 수 없구나.
        // 컨트롤러끼리의 통신을 어떻게 하지
        // http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs
        // Using $rootScope.$broadcast and $scope.$on for a PubSub communication.

        /*

        if (id === 'admin' && password === 'admin') {
            SessionService.setCurrentSessionType(SESSION_TYPE.ADMIN);
            $location.path('admin-page');
        } else if (id === 'valuer' && password === 'v') {
            SessionService.setCurrentSessionType(SESSION_TYPE.VALUER);
            $location.path('valuer-page');
        } else if (id === 'submitter' && password === 's') {
            SessionService.setCurrentSessionType(SESSION_TYPE.SUBMITTER);
            $location.path('submitter-page');
        } else {
            SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
            alert('wrong id or pw\ntry again!');
        }
        */
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

        // var req = {
        //     method: 'POST',
        //     url: 'http://ror.olaf.kr/api/login',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        // };

        var config = {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };
        $http.post('http://ror.olaf.kr/api/login', $scope.signInUserModel, config);

        // $http(req).then(function (data) {
        //     console.log(data);
        //
        // }, function (data) {
        //     // $scope.signInUserModel.id = "error";
        //     // $scope.signInUserModel.password = "error!!";
        //
        //     console.log('??');
        //     console.log(data);
        // });
        // */
        // console.log(SessionService.getCurrentSessionType());
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
