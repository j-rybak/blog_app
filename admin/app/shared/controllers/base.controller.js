'use strict';

angular.module('admin.shared')
    .controller('BaseCtrl', ['$scope', 'title',  function ($scope, title) {
        $scope.title = title;
    }]);
