'use strict';

describe('Controller: AdmininfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdmininfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmininfoCtrl = $controller('AdmininfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmininfoCtrl.awesomeThings.length).toBe(3);
  });
});
