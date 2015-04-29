'use strict';

angular.module('configeditorApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
