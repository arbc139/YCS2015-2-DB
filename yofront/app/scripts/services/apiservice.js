'use strict';

/**
 * @ngdoc service
 * @name dbfrontappApp.ApiService
 * @description
 * # ApiService
 * Factory in the dbfrontappApp.
 */
angular.module('dbfrontappApp')
  .factory('ApiService', function ($http) {
    // Service logic
    // ...



    // Public API here
    return {
      getTaskList: function (onS, onE) {
        $http.get('http://db.olaf.kr/api/admin/tasks.json')
        .then(onS, onE);
      },

      getUserList: function(onS, onE) {
        $http.get('http://db.olaf.kr/api/admin/users.json')
        .then(onS, onE);
      },
      login: function(id, pw, onS, onE) {
        $http.get('http://db.olaf.kr/api/login.json', {
          params: {
            str_id: id,
            password: pw
          }
        })
        .then(onS, onE);
      },
      newTask: function(params, onS, onE) {
          var config = {
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          };

          $http
          .post('http://db.olaf.kr/api/admin/tasks', params, config)
          .then(onS, onE);
          // .success(function (data) {
          //   console.log('success ');
          //   console.log(data);
          //
          //   var updateSession = function (si, i) {
          //     console.log("updateSession: " + si + " , " + i);
          //     SessionService.setStrId(si);
          //     SessionService.setId(i);
          //   };
          //
          //   if (data.role === 'admin') {
          //     SessionService.setCurrentSessionType(SESSION_TYPE.ADMIN);
          //     updateSession(data.str_id, data.id);
          //
          //     $location.path('admin-page');
          //   } else if (data.role === 'valuer') {
          //     SessionService.setCurrentSessionType(SESSION_TYPE.VALUER);
          //     updateSession(data.str_id, data.id);
          //
          //     $location.path('valuer-page');
          //   } else if (data.role === 'submitter') {
          //     SessionService.setCurrentSessionType(SESSION_TYPE.SUBMITTER);
          //     updateSession(data.str_id, data.id);
          //
          //     $location.path('submitter-page');
          //   } else if (data.role === 'wrong') {
          //     SessionService.setCurrentSessionType(SESSION_TYPE.WRONG);
          //     alert('wrong id or pw\ntry again!');
          //   } else {
          //     alert('sibal??? ? ?sdfljasdlfjasdf');
          //   }
          // })
          // .error(function (data) {
          //   console.log('fail ' + data);
          //   alert("server error!\nsee the debugging console");
          // });
      }
      // post '/api/admin/tasks’로 포스트 보내주면되고 argument는
      // :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema
      // 이 순서대로
      // task_data_table_schema는 그걸로보내줘
      // column의 리스트?
    };
  });
