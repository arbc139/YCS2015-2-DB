angular.module('myApp.valuerPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/valuerPage', {
    templateUrl: 'myPage/valuerPage.html',
    controller: 'valuerPageCtrl'
  });
}])

.controller('valuerPageCtrl', [function() {

}]);
