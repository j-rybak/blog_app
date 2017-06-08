angular.module('admin.shared')
    .filter('hidePassword', function() {
        return function(input) {
            input = input || '';
            var out = '';
            for (var i = 0; i < input.length; i++) {
                out +='*'
            }
            return out;
        };
    });
