'use strict';
/**********************************************************************************************************************
 * greeting.controller.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .controller('GreetingController', ['$scope', '$http', function ($scope, $http) {
        $http.get('/api/greeting').
            success(function(data) {
                $scope.greeting = data;
            });
    }]);