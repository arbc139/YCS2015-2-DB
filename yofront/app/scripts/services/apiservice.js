'use strict';

/**
 * @ngdoc service
 * @name dbfrontappApp.ApiService
 * @description
 * # ApiService
 * Factory in the dbfrontappApp.
 */
angular.module('dbfrontappApp')
  .factory('ApiService', function ($http, SessionService) {
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
      postModifyUserInfo: function(newId, newPW, newName, newSex, newAddress, newBirth, newPhone, onS, onE) {
        var params = {
          user_id : newId,
        	password : newPW,
        	u_name : newName,
        	sex : newSex,
        	address : newAddress,
        	birth : newBirth,
        	phone_number : newPhone
        };

        $http.post(SERVER_URL + '/users/update', params, config)
        .then(onS, onE);
      },
      postNewTask: function(name, desc, mup, tdtName, schemaCols, rdts, onS, onE) {
        var params = {
          task: {
            t_name: name,
            description: desc,
            minimum_upload_period: mup,
            task_data_table_name: tdtName,
            schema_cols: schemaCols
          },
          raw_data_types: rdts
        };

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
        $http.get(SERVER_URL + '/admin/users/' + userId + '.json/')
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
        $http.get(SERVER_URL + '/admin/rdts.json')
        .then(onS, onE);
      },
      getAdminManageJSON: function(taskId, onS, onE) {
        $http.get(SERVER_URL + '/admin/tasks/manage.json', {
          params: {
            task_id: taskId
          }
        }).then(onS, onE);
      },
      postTaskApplyDecision: function(tId, uId, isAccepted, onS, onE) {
        var params = {
          task_id: tId,
          user_id: uId,
          accept: isAccepted
        };

        $http.post(SERVER_URL + '/admin/tasks/manage', params, config)
        .then(onS, onE);
      },
      postModifyAdminPassword: function(newPassword, onS, onE) {
        var params = {
          user_id: 1,
          password: newPassword
        };

        $http.post(SERVER_URL + '/admin/info', params, config)
        .then(onS, onE);
      },
      postNewRawDataType: function(rdtName, colList, onS, onE) {
        var params = {
          raw_data_type: {
            raw_name: rdtName,
            schema_cols: colList
          }
        };

        $http.post(SERVER_URL + '/admin/rdts', params, config)
        .then(onS, onE);
      },
      getTaskRdtAppendInfo: function(taskId, onS, onE) {
        var p = {
          params: {
            task_id: taskId
          }
        };

        $http.get(SERVER_URL + '/admin/tasks/manage/rdts.json', p)
        .then(onS, onE);
      },
      postTaskRdtAppend: function(taskId, newRdtList, onS, onE) {
        var params = {
          task_id: taskId,
          rdt_ids: newRdtList
        };

        $http.post(SERVER_URL + '/admin/tasks/manage/rdts', params, config)
        .then(onS, onE);
      },
      getTaskCsvString: function(taskId, onS, onE) {
        var p = {
          params: {
            task_id: taskId
          }
        };

        $http.get(SERVER_URL + '/admin/export.json', p)
        .then(onS, onE);
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
      },
      postDataSubmit: function(taskId, rdtId, period, inning, csvStr, onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var params = {
          csv: csvStr,
          user_id: uId,
          task_id: taskId,
          rdt_id: rdtId,
          period: period,
          inning: inning
        };
        console.log(params);

        $http.post(SERVER_URL + '/submitter/tasks/submit', params, config)
        .then(onS, onE);
      },
      postApplyTask: function(taskId, onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var params = {
          task_id: taskId,
          user_id: uId
        };

        $http.post(SERVER_URL + '/submitter/tasks/apply', params, config)
        .then(onS, onE);
      },
      getAppliableTaskList: function(onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var p = {
          params: {
            user_id: uId
          }
        };

        $http.get(SERVER_URL + '/submitter/tasks/apply.json', p)
        .then(onS, onE);
      },
      getSubmittableTaskList: function(onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var p = {
          params: {
            user_id: uId
          }
        };

        $http.get(SERVER_URL + '/submitter/tasks/participate.json', p)
        .then(onS, onE);
      },
      getSubmitterTaskInfo: function(taskId, onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var p = {
          params: {
            user_id: uId,
            task_id: taskId
          }
        };

        $http.get(SERVER_URL + '/submitter/tasks/info.json', p)
        .then(onS, onE);
      },

      // valuer
      getNotYetValuedParsingDataSequenceFileList: function(onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var p = {
          params: {
            user_id: uId
          }
        };

        $http.get(SERVER_URL + '/valuer/pdsfs/notvalued.json', p)
        .then(onS, onE);
      },
      postFileEvaluation: function(pdsfId, score, isPassed, onS, onE) {
        var uId = SessionService.getId();

        if (uId === -1) {
          alertify.error('user id -1 <br>(you should not use test session)');
          return;
        }

        var params = {
          pdsf_id: pdsfId,
          value_score: score,
          is_passed: isPassed
        };
        console.log('ddd');
        console.log(params);

        $http.post(SERVER_URL + '/valuer/pdsfs/notvalued', params, config)
        .then(onS, onE);
      }
    };
  });
