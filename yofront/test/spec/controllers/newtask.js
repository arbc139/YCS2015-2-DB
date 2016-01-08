'use strict';

describe('Controller: NewtaskCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var NewtaskCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewtaskCtrl = $controller('NewtaskCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewtaskCtrl.awesomeThings.length).toBe(3);
  });
});
