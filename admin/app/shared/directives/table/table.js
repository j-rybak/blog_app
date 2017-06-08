angular.module('admin.shared')
    .directive('itemsTable',['Config',function(Config) {
        return {
            templateUrl:Config.staticPrefix+'app/shared/directives/table/table.html',
            restrict: 'E',
            replace: true,
            scope: {
                items:'=',
                fields:'=',
                pluralize:'=',
                edit:'='
            },
            controller: ['$scope', '$state', function ($scope, $state) {
                $scope.ordering = "";
                $scope.editUrl = function(view, params){
                    var _view = view || $scope.edit;
                    var _params = params || {};
                    return $state.href(_view, _params)
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
