angular.module('admin.shared')
    .directive('cellValue',['Config',function(Config) {
        return {
            templateUrl:Config.staticPrefix+'app/shared/directives/table/cell-value/cell-value.html',
            restrict: 'E',
            scope: {
                value:'=',
                format:'=',
                link:'=',
            },
            controller: ['$scope',  function ($scope) {
                $scope.value = $scope.value === undefined? "-": $scope.value;

            }]
        }
    }]);
