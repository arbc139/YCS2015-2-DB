angular.module('myApp.valuerPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/valuer-page', {
    templateUrl: 'myPage/valuerPage.html',
    controller: 'valuerPageCtrl'
  });
}])

.controller('valuerPageCtrl', function($location, SessionService, SESSION_TYPE) {
    if (SessionService.getCurrentSessionType() !== SESSION_TYPE.VALUER) {
        alert("you are not valuer, plaese sign in");
        $location.path('sign-in');
    }
});
