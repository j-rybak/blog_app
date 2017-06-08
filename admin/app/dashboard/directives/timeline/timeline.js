'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('admin.dashboard')
	.directive('timeline',['Config',function(Config) {
    return {
        templateUrl:Config.staticPrefix+'app/dashboard/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  }]);
