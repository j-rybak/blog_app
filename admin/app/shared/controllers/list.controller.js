'use strict';

angular.module('admin.shared')
    .controller('ListCtrl', ['$scope', '$resource', 'growl', 'resourceFactory', 'Config', function ($scope, $resource, growl, resourceFactory, Config) {
        $scope.resourceConfig = resourceFactory;
        var ListResource = $resource(Config.api+$scope.resourceConfig.url);
        $scope.items = ListResource.query(function() {
            growl.addInfoMessage("Pobrano "+$scope.items.length+" elementów");
        });

    }]);
