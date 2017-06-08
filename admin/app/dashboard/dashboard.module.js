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
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'admin.dashboard',
                            files: [
                                Config.staticPrefix + 'app/dashboard/controllers/dashboard.controller.js',
                                // Config.staticPrefix + 'app/dashboard/directives/timeline/timeline.js',
                                // Config.staticPrefix + 'app/dashboard/directives/notifications/notifications.js',
                                // Config.staticPrefix + 'app/dashboard/directives/chat/chat.js',
                                Config.staticPrefix + 'app/dashboard/directives/stats/stats.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.charts', {
                url: '/charts',
                controller: 'ChartCtrl',
                templateUrl: Config.staticPrefix + 'views/dashboard/charts.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'admin.dashboard',
                            files: [
                                Config.staticPrefix + 'app/dashboard/controllers/chart.controller.js'
                            ]
                        }), $ocLazyLoad.load({
                            name: 'chart.js',
                            files: [
                                Config.staticPrefix + 'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                Config.staticPrefix + 'bower_components/angular-chart.js/dist/angular-chart.css'
                            ]
                        })
                    }
                }
            });
    }]);

    
