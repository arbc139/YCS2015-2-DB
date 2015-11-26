'use strict';

/**
* @ngdoc function
* @name dbfrontappApp.controller:SubmitterpageCtrl
* @description
* # SubmitterpageCtrl
* Controller of the dbfrontappApp
*/
angular.module('dbfrontappApp')
.controller('SubmitterpageCtrl', function ($scope, $location, SessionService, ApiService, SESSION_TYPE) {
  this.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  // check submitter!
  SessionService.checkSessionType(SESSION_TYPE.SUBMITTER);


  // begin appliable task
  ApiService.getTaskList(function(res) { // todo remove
    $scope.appliableTaskList = res.data;
  }, function(res) {
    console.log('getTaskList error');
    console.log(res.data);
  });

  $scope.apply = function(tableId) {
    alertify.confirm('waerjapweoirjapwoeirjapwoerijapwoe rjapwoeirj apwoeirj aopwer jawpeorj waoperijweoapjreowijriewjrowjrow jpaweorij wapoerijapwoeirj apoweirj pawoeirj apwoeirj apwoerij apweori jawpeori japweorij apweorij wpeo ijawpoerij awpoerij awpoerij oeirjweorjweojriewjr ojawperj awpeor jewioar jwaoierj apwei rjewaor jawpeoijr pawoerj poaewijr aoweirj apowirjawoer jpeor jaweporij apoewrij oej ioaewrj ajr opewjr oaej roaewjr aweirjpawrjpoeawijr paoeiwjr opaweijr',
    function(){
      alertify.success('Ok');
    },
    function(){
      alertify.error('Cancel');
    });
  };
  // end appliable task


  // begin submittable task
  ApiService.getTaskList(function(res) { // todo remove
    $scope.submittableTask = res.data;
  }, function(res) {
    console.log('getTaskList error');
    console.log(res.data);
  });

  $scope.submit = function(tableId) {

  };

  $scope.info = function(tableId) {

  };

  // end submittable task




});
