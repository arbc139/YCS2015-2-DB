'use strict';

describe('Controller: AdminManageCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminManageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminManageCtrl = $controller('AdminManageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminManageCtrl.awesomeThings.length).toBe(3);
  });
});
