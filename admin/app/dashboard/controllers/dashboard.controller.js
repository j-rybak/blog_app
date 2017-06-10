'use strict';

angular.module('admin.dashboard')
  .controller('DashboardCtrl', ['$scope', '$resource', 'growl', 'Config', function ($scope, $resource, growl, Config) {
      var Counts = $resource(Config.api+'/api/dashboard/counts');
      $scope.counts = Counts.get({}, function () {
          growl.addInfoMessage("Pobrano dane");
      });

}]);