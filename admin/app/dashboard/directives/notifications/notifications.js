'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('admin.dashboard')
    .directive('notifications', ['Config', function (Config) {
        return {
            templateUrl: Config.staticPrefix + 'app/dashboard/directives/notifications/notifications.html',
            restrict: 'E',
            replace: true,
        }
    }]);


