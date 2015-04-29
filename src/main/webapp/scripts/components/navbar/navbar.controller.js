'use strict';

angular.module('configeditorApp')
    .controller('NavbarController', function ($scope, $state) {

        $scope.$state = $state;

        $scope._isAuthenticated = true;
        $scope.isAuthenticated = function () {
            return $scope._isAuthenticated;
        };

        $scope.logout = function () {
            //Auth.logout()
            $scope._isAuthenticated  = false;
            $state.go('home');
        }
        $scope.login = function () {
            $scope._isAuthenticated  = true;
        };
    });
