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
      $scope.pdsfList = res.data;
    }, function() {
      alertify.error('error');
    });

    ApiService.getValuedParsingDataSequenceFileList(function(res) {
      $scope.valuedPdsfList = res.data;
    }, function() {
      alertify.error('error');
    })

    $scope.goToTextViewer = function(i) {
      CacheService.setCache($scope.pdsfList[i].data_blob);
      $location.path('/text-viewer');
    };


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

        }, function() {

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

    }; // end of $scope.eval()
    // end of 평가 해야할 목록

    // begin of 평가 완료한 목록
    $scope.goToTextViewer = function(i) {
      CacheService.setCache($scope.valuedPdsfList[i].data_blob);
      $location.path('/text-viewer');
    };



    // end of 평가 완료한 목록
  });
