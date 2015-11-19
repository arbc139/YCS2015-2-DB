'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.submitterPage',
    'myApp.valuerPage',
    'myApp.adminPage',
    'myApp.view2',
    'myApp.sign',
    'myApp.version'
])
.config(['$routeProvider', function($routeProvider) {
    // $routeProvider.otherwise({redirectTo: '/view1'});
    $routeProvider.when('/', {
        templateUrl: 'sign/please-sign-in.html'
        //   controller: 'View1Ctrl'
    });
}])
// .config(['$locationProvider', function($location) {
//   $location.html5Mode(true); //now there won't be a hashbang within URLs for browers that support HTML5 history
// }])
.constant("navbarActiveClass", "active")
.controller("navListCtrl", function ($scope, $location,
    SessionService,
    navbarActiveClass, SESSION_TYPE
) {
    var selectedNav = null;

    $scope.navList = [{
        name: "My Page"
    }, {
        name: "Temp View (View2)"
    }];
    $scope.signList = [{
        name: "SIGN IN",
        url : "#/sign-in"
    }, {
        name: "SIGN UP",
        url: "#/sign-up"
    }];

    $scope.selectNav = function(newNav) {
        selectedNav = newNav;
    };

    $scope.getNavClass = function (nav) {
        return selectedNav === nav ? navbarActiveClass : "";
    };

    $scope.clickNav = function(name) {
        // console.log("name: " + name + "\nnavList: " + $scope.navList[0].name);
        if (name === $scope.navList[0].name) {
            // My Page
            console.log("my page");
            var sessionType = SessionService.getCurrentSessionType();
            console.log(sessionType);

            if (sessionType === SESSION_TYPE.SUBMITTER) {
                $location.path('submitterPage');
            } else if (sessionType === SESSION_TYPE.VALUER) {

            } else if (sessionType === SESSION_TYPE.ADMIN) {

            } else if (sessionType === SESSION_TYPE.WRONG) {

            }
        }

        else if (name === $scope.navList[1].name) {
            // View 2
            console.log("view 2");
        }
    }
});
