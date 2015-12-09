'use strict';

/**
 * @ngdoc function
 * @name dbfrontappApp.controller:ValuerpageCtrl
 * @description
 * # ValuerpageCtrl
 * Controller of the dbfrontappApp
 */
angular.module('dbfrontappApp')
  .controller('ValuerpageCtrl', function ($scope, $location, ApiService, SessionService, CacheService, SESSION_TYPE) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    // check vauler!
    SessionService.checkSessionType(SESSION_TYPE.VALUER);

    ApiService.getNotYetValuedParsingDataSequenceFileList(function(res) {
      console.log(res);
      $scope.pdsfList = res.data;
    }, function() {
      alertify.errorv('error');
    });

    $scope.goToTextViewer = function(i) {
      CacheService.setCache($scope.pdsfList[i].data_blob);
      $location.path('/text-viewer');
    };

    $scope.score = 100;

    $scope.eval = function(i) {
      // alertify
      // .defaultValue('Pass or Non-pass?')
      // .okBtn('PASS')
      // .cancelBtn('NON-PASS')
      // .prompt('Fill the valuer score & select Pass or not', function(){
      //
      // }, function() {
      //
      // });

      var score;
      var isPassed;

      var promptValueScore = function() {
        alertify
        .defaultValue('value score')
        .okBtn('SUBMIT')
        .cancelBtn('CANCEL')
        .prompt('Fill the valuer score', function(val, ev){
          ev.preventDefault();
          score = val;
          ApiService.postFileEvaluation($scope.pdsfList[i].id, score, isPassed,
          function() {
            alertify.success('success');
          }, function() {
            alertify.error('error');
          });

        }, function(val, ev) {

          alertify.error('canceled');
        });
      };

      var confirmPassOrNot = function() {
        alertify
        .okBtn('PASS')
        .cancelBtn('NON-PASS')
        .confirm('Pass or NON-PASS?', function() {
          // pass
          isPassed = true;
          promptValueScore();
        }, function() {
          // non psass
          isPassed = false;
          promptValueScore();
        });

      };

      alertify.confirm('평가 하시겠습니까?',
      function() {
        confirmPassOrNot();
      },
      function() {
        alertify.error('canceled');
      });

    };
  });
