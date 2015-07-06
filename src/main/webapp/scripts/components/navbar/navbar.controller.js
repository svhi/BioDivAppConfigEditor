'use strict';

angular.module('configeditorApp')
    .controller('NavbarController', function ($scope, $state, $http) {

        $http.get('/api/atlas').
            success(function(data) {
                $scope.atlasList = data;
                console.log(data);
            });

        $scope.selectedAtlas = null;
        $scope.setSelectedAtlas = function(atlas){
            $scope.selectedAtlas = atlas;
        };

        $scope.$state = $state;

        $scope._isAuthenticated = true;
        $scope.isAuthenticated = function () {
            return $scope._isAuthenticated;
        };

        $scope.logout = function () {
            //Auth.logout()
            $scope._isAuthenticated  = false;
            $state.go('home');
        };
        $scope.login = function () {
            $scope._isAuthenticated  = true;
        };
    });
