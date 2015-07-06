'use strict';

angular.module('configeditorApp')
    .controller('AtlasListController', ['$scope', '$http', function ($scope, $http) {
        $http.get('/api/atlas').
            success(function(data) {
                $scope.atlasList = data;
                console.log(data);
            });
    }]);