'use strict';

angular.module('admin.blog')
    .factory("PostsFactory", function() {
    var fields = [
        {
            key: 'title',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Tytuł',
                placeholder: 'Tytuł',
                required: true,
                format: 'text',
            }
        },
        {
            key: 'content',
            type: 'textarea',
            templateOptions: {
                label: 'Treść',
                placeholder: 'Treść',
                required: true,
                format: 'text',
            }
        },

        {
            key: 'image',
            type: 'input',
            templateOptions: {
                type: 'url',
                image: true,
                label: 'Obraz',
                placeholder: 'Obraz',
                format: 'image',
            },
        },
        {
            key: 'owner',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Właściciel',
                format: 'link',
                view:'users.edit'
            },
            hideExpression: "true"
        },
        {
            key: 'createdAt',
            type: 'input',
            templateOptions: {
                label: 'Utworzony',
                format: 'date'
            },
            hideExpression: "true"
        },
        {
            key: 'updatedAt',
            type: 'input',
            templateOptions: {
                label: 'Zmodyfikowany',
                format: 'date'
            },
            hideExpression: "true"
        }
    ];

    return {
        url: "/api/posts/:id",
        edit: "blog.posts-edit",
        list: "blog.posts-list",
        pluralize: {0:"Brak postów", 'one':"Post", 'few':'Posty', 'many':"Postów"},
        fields: fields
    }
});
