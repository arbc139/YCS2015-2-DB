'use strict';

describe('Controller: TextViewerCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var TextViewerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextViewerCtrl = $controller('TextViewerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TextViewerCtrl.awesomeThings.length).toBe(3);
  });
});
