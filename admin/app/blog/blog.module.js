'use strict';

angular
    .module('admin.blog', [
        'admin.shared'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'Config', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, Config) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider
            .state('blog', {
                url: '/blog',
                controller: 'BaseCtrl',
                abstract: true,
                templateUrl: Config.staticPrefix + 'views/base.html',
                resolve: {
                    title: function () {
                        return "Blog";
                    },
                    loadMyFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'admin.blog',
                            files: [
                                Config.staticPrefix + 'app/blog/factories/posts.factory.js',
                                Config.staticPrefix + 'app/blog/factories/comments.factory.js'
                            ]
                        })
                    }]
                }

            })
            .state('blog.posts-list', {
                url: '/posts',
                controller: 'ListCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/list.html',
                resolve: {
                    resourceFactory: ['PostsFactory', function (PostsFactory) {
                        return PostsFactory
                    }],
                }
            })
            .state('blog.posts-edit', {
                url: '/posts/:id',
                controller: 'FormCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/form.html',
                resolve: {
                    resourceFactory: ['PostsFactory', function (PostsFactory) {
                        return PostsFactory
                    }],
                }
            })
            .state('blog.comments-list', {
                url: '/comments',
                controller: 'ListCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/list.html',
                resolve: {
                    resourceFactory: ['CommentsFactory', function (CommentsFactory) {
                        return CommentsFactory
                    }],
                }
            })
            .state('blog.comments-edit', {
                url: '/comments/:id',
                controller: 'FormCtrl',
                templateUrl: Config.staticPrefix + 'views/shared/form.html',
                resolve: {
                    resourceFactory: ['CommentsFactory', function (CommentsFactory) {
                        return CommentsFactory
                    }],
                }
            });
            $urlRouterProvider.otherwise('/blog/posts');
    }]);

    
