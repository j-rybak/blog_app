'use strict';

angular
    .module('admin.shared', [])
    .run(['formlyConfig', 'formlyValidationMessages',function (formlyConfig, formlyValidationMessages) {
    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

    formlyValidationMessages.addStringMessage('required', 'Pole wymagane');
    formlyValidationMessages.addStringMessage('email', 'Niepoprawny adres email');
    formlyValidationMessages.addStringMessage('unique', 'Pole musi być unikatowe');
    }])
    .config(['formlyConfigProvider', function (formlyConfigProvider) {

    formlyConfigProvider.setWrapper({
        name: 'validation',
        types: ['input'],
        templateUrl: 'error-messages.html'
    });

}]);

