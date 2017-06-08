'use strict';

angular.module('admin.blog')
    .factory("CommentsFactory", function() {
    var fields = [
        {
            key: 'content',
            type: 'textarea',
            templateOptions: {
                label: 'Treść',
                placeholder: 'Treść',
                required: true,
                format:'text'
            }
        },
        {
            key: 'post',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Post',
                format: 'link',
                view:'blog.posts-edit'
            },
            hideExpression: "true"
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
        url: "/api/comments/:id",
        edit: "blog.comments-edit",
        list: "blog.comments-list",
        pluralize: {0:"Brak komentarzy", 'one':"Komentarz", 'few':'Komentarze', 'many':"Komentarzy"},
        fields: fields
    }
});
