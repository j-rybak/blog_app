'use strict';

angular.module('admin.shared')
    .controller('ListCtrl', ['$scope', '$resource', 'growl', 'resourceFactory', function ($scope, $resource, growl, resourceFactory) {
        $scope.resourceConfig = resourceFactory;
        var ListResource = $resource($scope.resourceConfig.url);
        $scope.items = ListResource.query(function() {
            growl.addInfoMessage("Pobrano "+$scope.items.length+" elementów");
        });

    }]);
