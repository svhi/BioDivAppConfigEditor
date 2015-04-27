'use strict';

angular.module('configeditorApp')
    .controller('HelloController', ['$scope', '$http', function ($scope, $http) {
        $http.get('/api/greeting').
            success(function(data) {
                $scope.greeting = data;
            });
    }]);