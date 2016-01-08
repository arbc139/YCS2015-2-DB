'use strict';

describe('Controller: AdminPageNewRdtCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminPageNewRdtCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPageNewRdtCtrl = $controller('AdminPageNewRdtCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminPageNewRdtCtrl.awesomeThings.length).toBe(3);
  });
});
