'use strict';

angular.module('configeditorApp',['LocalStorageModule'])

    .run(function ($rootScope, $location, $window, $http, ENV, VERSION) {
        $rootScope.ENV = ENV;
        $rootScope.VERSION = VERSION;
    });
