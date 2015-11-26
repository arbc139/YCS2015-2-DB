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
      .when('/admin-page/statistics', {
        templateUrl: 'views/admin_statistics.html',
        controller: 'AdminStatisticsCtrl'
      })
      .when('/admin-page/manage', {
        templateUrl: 'views/admin_manage.html',
        controller: 'AdminManageCtrl'
      })
      .when('/submitter-page', {
        templateUrl: 'views/submitterpage.html',
        controller: 'SubmitterpageCtrl'
      })
      .when('/valuer-page', {
        templateUrl: 'views/valuerpage.html',
        controller: 'ValuerpageCtrl'
      })
      .when('/my-page-redirect', {
        templateUrl: 'views/mypageredirect.html',
        controller: 'MyPageRedirectCtrl'
      })
      .when('/admin-info', {
        templateUrl: 'views/admininfo.html',
        controller: 'AdmininfoCtrl'
      })
      .when('/valuer-info', {
        templateUrl: 'views/valuerinfo.html',
        controller: 'ValuerinfoCtrl'
      })
      .when('/submitter-info', {
        templateUrl: 'views/submitterinfo.html',
        controller: 'SubmitterinfoCtrl'
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
      // admin page
      .when('/admin/new-page', {
        templateUrl: 'views/newtask.html',
        controller: 'NewtaskCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
