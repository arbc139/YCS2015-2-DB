'use strict';

describe('Controller: AdminStatisticsCtrl', function () {

  // load the controller's module
  beforeEach(module('dbfrontappApp'));

  var AdminStatisticsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminStatisticsCtrl = $controller('AdminStatisticsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminStatisticsCtrl.awesomeThings.length).toBe(3);
  });
});
