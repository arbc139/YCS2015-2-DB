'use strict';

describe('Controller: ValuerinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var ValuerinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValuerinfoCtrl = $controller('ValuerinfoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValuerinfoCtrl.awesomeThings.length).toBe(3);
  });
});
