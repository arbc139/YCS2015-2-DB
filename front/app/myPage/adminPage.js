angular.module('myApp.adminPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin-page', {
    templateUrl: 'myPage/adminPage.html',
    controller: 'adminPageCtrl'
  });
}])

.controller('adminPageCtrl', [function() {

}]);
