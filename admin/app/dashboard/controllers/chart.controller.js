'use strict';

angular.module('admin.dashboard')
    .controller('ChartCtrl', ['$scope', '$resource', 'growl',  function ($scope, $resource, Config) {
        var apiUrl = Config.api+'/api/dashboard/counts';
        console.log(apiUrl);
        var Counts = $resource(apiUrl);
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