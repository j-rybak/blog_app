'use strict';

angular
    .module('admin', [
        'oc.lazyLoad',
        'ui.router',
        'ngResource',
        'ngAnimate',
        'ui.bootstrap',
        'angular-loading-bar',
        'angular-growl',
        'formly',
        'formlyBootstrap',
        'ngMessages',
        'admin.dashboard',
        'admin.users',
        'admin.blog',
        'admin.shared'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'growlProvider', function ($stateProvider, $urlRouterProvider, growlProvider) {
        growlProvider.globalTimeToLive(5000);
        $urlRouterProvider.otherwise('/dashboard');
    }]);

