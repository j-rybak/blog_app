'use strict';

angular
    .module('admin.dashboard', [
        'admin.shared'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'Config', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, Config) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'BaseCtrl',
                abstract: true,
                templateUrl: Config.staticPrefix + 'views/base.html',
                redirectTo: 'dashboard.home',
                resolve: {
                    title: function () {
                        return "Dashboard";
                    },
                }
            })
            .state('dashboard.home', {
                url: '',
                controller: 'DashboardCtrl',
                templateUrl: Config.staticPrefix + 'views/dashboard/home.html',

            })
            .state('dashboard.charts', {
                url: '/charts',
                controller: 'ChartCtrl',
                templateUrl: Config.staticPrefix + 'views/dashboard/charts.html',

            });
    }]);

    
