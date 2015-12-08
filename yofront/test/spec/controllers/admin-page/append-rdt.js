'use strict';

describe('Controller: AdminPageAppendRdtCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminPageAppendRdtCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPageAppendRdtCtrl = $controller('AdminPageAppendRdtCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminPageAppendRdtCtrl.awesomeThings.length).toBe(3);
  });
});
