'use strict';

describe('Controller: SubmitterinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var SubmitterinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitterinfoCtrl = $controller('SubmitterinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SubmitterinfoCtrl.awesomeThings.length).toBe(3);
  });
});
