angular.module('admin.shared')
    .directive('iconCheckbox',['Config',function(Config) {
        return {
            restrict: 'E',
            replace: true,
            template: "<i class='fa' ng-class=\"value ? 'fa-check' : 'fa-times'\">",
            scope: {
                value:'=',
            },
        }
    }]);
