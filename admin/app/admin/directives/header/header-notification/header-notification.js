'use strict';

angular.module('admin')
    .directive('headerNotification', ['Config', function (Config) {
        return {
            templateUrl: Config.staticPrefix + 'app/admin/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
        }
    }]);


