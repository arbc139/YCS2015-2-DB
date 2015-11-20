'use strict';

describe('Controller: SubmitterpageCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var SubmitterpageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitterpageCtrl = $controller('SubmitterpageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SubmitterpageCtrl.awesomeThings.length).toBe(3);
  });
});
