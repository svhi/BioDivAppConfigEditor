'use strict';

angular.module('configeditorApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('greeting', {
                parent: 'site',
                url: '/greeting',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/greeting/greeting.html',
                        controller: 'GreetingController'
                    }
                }
            });
    });
