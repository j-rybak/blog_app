'use strict';

angular.module('admin')
    .directive('header', ['Config', function (Config) {
        return {
            templateUrl: Config.staticPrefix + 'app/admin/directives/header/header.html',
            restrict: 'E',
            replace: true,
        }
    }]);


