'use strict';

/**
 * @ngdoc overview
 * @name dbfrontappApp
 * @description
 * # dbfrontappApp
 *
 * Main module of the application.
 */
angular
  .module('dbfrontappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/admin-page', {
          templateUrl: 'views/adminpage.html',
          controller: 'AdminpageCtrl',
      })
      .when('/my-page-redirect', {
        templateUrl: 'views/mypageredirect.html',
        controller: 'MyPageRedirectCtrl'
      })
      .when('/my-info-redirect', {
        templateUrl: 'views/myinforedirect.html',
        controller: 'MyInfoRedirectCtrl'
      })
      .when('/sign-in', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/sign-up', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
