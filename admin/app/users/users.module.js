'use strict';

angular
    .module('admin.users', [
        'admin.shared'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'Config', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, Config) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider
            .state('users', {
                url: '/users',
                controller: 'BaseCtrl',
                abstract: true,
                templateUrl: Config.staticPrefix + 'views/base.html',
                redirectTo: 'users.list',
                resolve: {
                    title: function () {
                        return "Users";
                    },
                }

            })
            .state('users.list', {
                url: '',
                controller: 'ListCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/list.html',
                resolve: {
                    resourceFactory: ['UsersFactory', function (UsersFactory) {
                        return UsersFactory
                    }],
                }
            })
            .state('users.add', {
                url: '/add',
                controller: 'FormCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/form.html',
                resolve: {
                    resourceFactory: ['UsersFactory', function (UsersFactory) {
                        return UsersFactory
                    }],
                }
            })
            .state('users.edit', {
                url: '/:id',
                controller: 'FormCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/form.html',
                resolve: {
                    resourceFactory: ['UsersFactory', function (UsersFactory) {
                        return UsersFactory
                    }],
                }
            });
    }]);

    
