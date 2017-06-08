'use strict';


angular.module('admin')
  .directive('sidebar',['Config',function(Config) {
    return {
      templateUrl:Config.staticPrefix+'app/admin/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller: ['$rootScope', '$scope', '$state', function ($rootScope,$scope, $state) {

          $rootScope.$on('$stateChangeSuccess', function(event, toUrl, fromUrl) {
              $scope.state = $state.current;
          });

      }]
    }
  }]);
