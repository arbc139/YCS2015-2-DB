'use strict';

describe('Controller: SubmitterTaskInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var SubmitterInfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitterInfoCtrl = $controller('SubmitterTaskInfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SubmitterInfoCtrl.awesomeThings.length).toBe(3);
  });
});
