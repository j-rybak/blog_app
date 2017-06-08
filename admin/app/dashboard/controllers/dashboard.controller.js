'use strict';

angular.module('admin.dashboard')
  .controller('DashboardCtrl', ['$scope', '$resource', 'growl', function ($scope, $resource, growl) {
      var Counts = $resource('/api/dashboard/counts');
      $scope.counts = Counts.get({}, function () {
          growl.addInfoMessage("Pobrano dane");
      });

}]);