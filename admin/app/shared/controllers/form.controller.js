'use strict';

angular.module('admin.shared')
    .controller('FormCtrl', ['$scope', '$resource', '$state', '$stateParams', 'growl', 'resourceFactory', 'Config',
        function ($scope, $resource, $state, $stateParams, growl, resourceFactory, Config) {
            $scope.resourceConfig = resourceFactory;
            $scope.submit = submit;
            $scope.remove = remove;

            var ItemResource = $resource(Config.api+$scope.resourceConfig.url, {id: '@_id'}, {update: {method: 'PUT'}});


            function init() {
                if ($stateParams.id) {
                    $scope.item = ItemResource.get({id: $stateParams.id}, function () {
                        growl.addInfoMessage("Pobrano dane");
                    }, function () {
                        growl.addErrorMessage("Błąd pobierania danych");
                    });
                }
            }

            function submit() {
                if ($scope.form.$valid) {
                    if (!$scope.item._id) {
                        $scope.item = new ItemResource($scope.item)
                        $scope.item.$save(function () {
                            growl.addInfoMessage("Zapisano dane");
                        }, function (err) {
                            processErrors(err);

                        });
                    }else{
                        $scope.item.$update(function () {
                            growl.addInfoMessage("Zapisano dane");
                        }, function (err) {
                            processErrors(err);

                        });
                    }
                }
            }

            function remove() {
                if ($scope.item._id) {
                    $scope.item.$remove(function () {
                        growl.addWarnMessage("Usunięto");
                        $state.go($scope.resourceConfig.list);
                    }, function (err) {
                        processErrors(err);
                    });
                }
            }

            function extractErrorMessages(data) {
                var errors = {};
                if (data.error) {
                    errors = data.error.errors || {}
                }
                return errors;
            }

            function processErrors(error) {
                var errors = extractErrorMessages(error.data);
                if (angular.equals(errors, {})) {
                    growl.addErrorMessage("Nieoczekiwany błąd zapsiu");
                } else {
                    displayErrors(errors)
                }
            }

            function displayErrors(errors) {
                angular.forEach(errors, function (value, key) {
                    growl.addErrorMessage(key + ": " + value.message);
                })
            }

            init();
        }]);

