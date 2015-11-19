angular.module('myApp.valuerPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/valuer-page', {
    templateUrl: 'myPage/valuerPage.html',
    controller: 'valuerPageCtrl'
  });
}])

.controller('valuerPageCtrl', [function() {

}]);
