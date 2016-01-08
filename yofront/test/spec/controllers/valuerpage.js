'use strict';

describe('Controller: ValuerpageCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var ValuerpageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValuerpageCtrl = $controller('ValuerpageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ValuerpageCtrl.awesomeThings.length).toBe(3);
  });
});
