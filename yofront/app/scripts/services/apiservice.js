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
    var config = {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    };

    var SERVER_URL = 'http://db.olaf.kr/api';
    // var SERVER_URL = 'http://localhost:3000/api';

    // Public API here
    return {
      getTaskList: function (onS, onE) {
        $http.get(SERVER_URL + '/admin/tasks.json')
        .then(onS, onE);
      },

      getUserList: function(onS, onE) {
        $http.get(SERVER_URL + '/admin/users.json')
        .then(onS, onE);
      },
      login: function(id, pw, onS, onE) {
        $http.get(SERVER_URL + '/login.json', {
          params: {
            str_id: id,
            password: pw
          }
        })
        .then(onS, onE);
      },
      newTask: function(params, onS, onE) {


          $http
          .post(SERVER_URL + '/admin/tasks', params, config)
          .then(onS, onE);

          // post '/api/admin/tasks’로 포스트 보내주면되고 argument는
          // :t_name, :description, :minimum_upload_period, :task_data_table_name, :task_data_table_schema
          // 이 순서대로
          // task_data_table_schema는 그걸로보내줘
          // column의 리스트?
      },
      getUserInfo: function(userId, onS, onE) {
        $http.get(SERVER_URL + '/admin/users.json/', {
          params: {
            id: userId
          }
        })
        .then(onS, onE);
      },
      getTaskInfo: function(taskId, onS, onE) {
        $http.get(SERVER_URL + '/admin/tasks/stat.json', {
          params: {
            task_id: taskId
          }
        })
        .then(onS, onE);
      },
      getRawDataTypes: function(onS, onE) {
        // {"id":1,"raw_name":"RAW_DATA_TYPE1_name","schema":"RAW_DATA_TYPE1_schema"}
        $http.get(SERVER_URL + '/admin/raw_data_types.json')
        .then(onS, onE);
      },
      getAdminManageJSON: function(taskId, onS, onE) {
        $http.get(SERVER_URL + '/admin/tasks/manage.json', {
          params: {
            task_id: taskId
          }
        }).then(onS, onE);
      },

      // signUp
      postSignUp: function(id, password, uName, sex, address, birth, phone, role, onS, onE) {
        var params;
        if (role === 'submitter') {
          params = {
              submitter: {
                str_id: id,
                password: password,
                u_name: uName,
                sex: sex,
                address: address,
                birth: birth,
                phone_number: phone,
                value_score: 0,
                role: role
              }
          };
        } else if (role === 'valuer') {
          params = {
              valuer: {
                str_id: id,
                password: password,
                u_name: uName,
                sex: sex,
                address: address,
                birth: birth,
                phone_number: phone,
                role: role
              }
          };
        }

        $http.post(SERVER_URL + '/users', params, config)
        .then(onS, onE);
      },

      // submitter
      postTestSubmit: function(csvStr, onS, onE) {
        var params = {
          csv: csvStr
        };
        $http.post(SERVER_URL + '/test/csv',
          params, config)
        .then(onS, onE);
      }
    };
  });
