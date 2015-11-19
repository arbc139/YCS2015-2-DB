angular.module('myApp.adminPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-page', {
    templateUrl: 'myPage/adminPage.html',
    controller: 'adminPageCtrl'
  });
}])

.controller('adminPageCtrl', function($location, SessionService, SESSION_TYPE) {
    if (SessionService.getCurrentSessionType() !== SESSION_TYPE.ADMIN) {
        alert("you are not admin, plaese sign in");
        $location.path('sign-in');
        // setTimeout("$('html').injector().get('$location').path('sign-in');$('html').scope().$apply();", 100);
    }
});
