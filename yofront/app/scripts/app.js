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
      .when('/admin-page/user-detail', {
        templateUrl: 'views/admin_user_detail.html',
        controller: 'AdminUserDetailCtrl'
      })
      .when('/submitter-page', {
        templateUrl: 'views/submitterpage.html',
        controller: 'SubmitterpageCtrl'
      })
      .when('/submitter-page/submit', {
        templateUrl: 'views/submitter_task_submit.html',
        controller: 'SubmitterTaskSubmitCtrl'
      })
      .when('/submitter-page/info', {
        templateUrl: 'views/submitter_task_info.html',
        controller: 'SubmitterTaskInfoCtrl'
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
      .when('/admin/new-task', {
        templateUrl: 'views/newtask.html',
        controller: 'NewtaskCtrl'
      })
      .when('/admin-page/new-rdt', {
        templateUrl: 'views/admin-page/new-rdt.html',
        controller: 'AdminPageNewRdtCtrl',
        controllerAs: 'adminPage/newRdt'
      })
      .when('/text-viewer', {
        templateUrl: 'views/text-viewer.html',
        controller: 'TextViewerCtrl',
        controllerAs: 'textViewer'
      })
      .when('/user-info', {
        templateUrl: 'views/user-info.html',
        controller: 'UserInfoCtrl',
        controllerAs: 'userInfo'
      })
      .when('/admin-page/append-rdt', {
        templateUrl: 'views/admin-page/append-rdt.html',
        controller: 'AdminPageAppendRdtCtrl',
        controllerAs: 'adminPage/appendRdt'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
