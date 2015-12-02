'use strict';

describe('Controller: AdminPageRdtListCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminPageRdtListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminPageRdtListCtrl = $controller('AdminPageRdtListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminPageRdtListCtrl.awesomeThings.length).toBe(3);
  });
});
