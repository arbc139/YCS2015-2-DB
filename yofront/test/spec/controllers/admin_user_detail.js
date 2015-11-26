'use strict';

describe('Controller: AdminUserDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminUserDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminUserDetailCtrl = $controller('AdminUserDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminUserDetailCtrl.awesomeThings.length).toBe(3);
  });
});
