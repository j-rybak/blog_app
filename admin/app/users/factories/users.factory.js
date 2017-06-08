'use strict';

angular.module('admin.users')
    .factory("UsersFactory", function() {
    var fields = [
        {
            key: 'username',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Nazwa użytkownika',
                placeholder: 'Nazwa użytkownika',
                required: true,
                format: 'text'
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: true,
                format: 'text'
            }
        },

        {
            key: 'password',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Hasło',
                placeholder: 'Hasło',
                required: true,
                format: 'password'
            },
            hideExpression: "model._id"
        },
        {
            key: 'active',
            type: 'checkbox',
            templateOptions: {
                label: 'Jest aktywny?',
                format: 'bool'
            }
        },
        {
            key: 'admin',
            type: 'checkbox',
            templateOptions: {
                label: 'Jest adminem?',
                format: 'bool'
            }
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
        url: "/api/users/:id",
        edit: "users.edit",
        list: "users.list",
        pluralize: {0:"Brak użytkowników", 'one':"Użytkownik", 'few':"Użytkowników", 'many':"Użytkowników"},
        fields: fields
    }
});
