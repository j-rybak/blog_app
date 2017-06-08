'use strict';

angular.module('admin.dashboard')
    .controller('ChartCtrl', ['$scope', '$resource', 'growl', function ($scope, $resource, growl) {
        var Counts = $resource('/api/dashboard/counts');
        $scope.dynamic = {
            labels: [],
            data: [],
            type: 'PolarArea',

            toggle: function () {
                this.type = this.type === 'PolarArea' ?
                    'Pie' : 'PolarArea';
            }
        };

        $scope.counts = Counts.get({}, function () {
            growl.addInfoMessage("Pobrano dane");
            $scope.dynamic.labels = ['Użytkownicy', 'Posty', 'Komentarze'];
            $scope.dynamic.data = [$scope.counts.users, $scope.counts.posts, $scope.counts.comments]
        });


    }]);