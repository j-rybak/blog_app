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
            controller: ['$scope', '$state', function ($scope, $state) {
                $scope.ordering = "";
                $scope.editUrl = function(params){
                    return $state.href($scope.edit, params)
                };
                $scope.changeOrder = function(fieldKey){
                    if($scope.ordering===fieldKey){
                        $scope.ordering= $scope.ordering.indexOf('-') !== -1 ? fieldKey : '-' + fieldKey;
                    }else{
                        $scope.ordering= fieldKey;
                    }
                }

            }]
        }
    }]);
