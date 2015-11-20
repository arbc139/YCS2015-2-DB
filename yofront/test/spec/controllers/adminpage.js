'use strict';

describe('Controller: AdminpageCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminpageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminpageCtrl = $controller('AdminpageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminpageCtrl.awesomeThings.length).toBe(3);
  });
});
