'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:NavCtrl
* @description
* # NavCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.constant('NavbarActiveClass', 'active')
.controller('NavCtrl', function (
  $scope, $location,
  NavbarActiveClass) {

    var selectedNav = null;

    $scope.navList = [{
      name: 'Home',
      url: '#/'
    }, {
      name: 'My Page',
      url: '#/my-page-redirect'
    }, {
      name: 'My Info',
      url: '#/my-info-redirect'
    }, {
      name: 'Sign In',
      url: '#/sign-in'
    }, {
      name: 'Sign Up',
      url: '#/sign-up'
    }];
    // $scope.signList = [{
    //   name: 'SIGN IN',
    //   url : '#/sign-in'
    // }, {
    //   name: 'SIGN UP',
    //   url: '#/sign-up'
    // }];

    $scope.selectNav = function(newNav) {
      selectedNav = newNav;
    };

    $scope.getNavClass = function (nav) {
      return selectedNav === nav ? NavbarActiveClass : "";
    };

    $scope.clickNav = function(name) {
      // console.log("name: " + name + "\nnavList: " + $scope.navList[0].name);
      if (name === $scope.navList[0].name) {
        // My Page
        console.log("my page");
        var sessionType = SessionService.getCurrentSessionType();
        console.log(sessionType);

        if (sessionType === SESSION_TYPE.SUBMITTER) {
          $location.path('submitter-page');
        } else if (sessionType === SESSION_TYPE.VALUER) {
          $location.path('valuer-page');
        } else if (sessionType === SESSION_TYPE.ADMIN) {
          $location.path('admin-page');
        } else if (sessionType === SESSION_TYPE.WRONG) {
          alert('you are not logged in!');
          setTimeout("$location.path('sign-in');", 2000);
        }
      }

      else if (name === $scope.navList[1].name) {
        // View 2
        console.log("view 2");
        $location.path('view2');
      }
    }
  })
  .controller('MyPageRedirectCtrl', function($location, SessionService, SESSION_TYPE) {
    var sessionType = SessionService.getCurrentSessionType();

    if (sessionType === SESSION_TYPE.SUBMITTER) {
      $location.path('submitter-page');
    } else if (sessionType === SESSION_TYPE.VALUER) {
      $location.path('valuer-page');
    } else if (sessionType === SESSION_TYPE.ADMIN) {
      $location.path('admin-page');
    } else if (sessionType === SESSION_TYPE.WRONG) {
      alert('you are not logged in!');
      $location.path('sign-in');
    }
  })
  .controller('MyInfoRedirectCtrl', function($location, SessionService, SESSION_TYPE) {
    var sessionType = SessionService.getCurrentSessionType();

    if (sessionType === SESSION_TYPE.SUBMITTER) {
      $location.path('submitter-info');
    } else if (sessionType === SESSION_TYPE.VALUER) {
      $location.path('valuer-info');
    } else if (sessionType === SESSION_TYPE.ADMIN) {
      $location.path('admin-info');
    } else if (sessionType === SESSION_TYPE.WRONG) {
      alert('you are not logged in!');
      $location.path('sign-in');
    }
  });
