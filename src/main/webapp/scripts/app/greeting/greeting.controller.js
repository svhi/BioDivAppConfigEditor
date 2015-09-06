'use strict';
/**********************************************************************************************************************
 * greeting.controller.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .controller('GreetingController', ['$scope', '$http', function ($scope, $http) {
        $scope.name = '';
        $http.get('/api/greeting').
            success(function(data) {
                $scope.greeting = data;
            });
        $scope.sendName =  function(){
            $http.get('/api/greeting', {params:{'name': $scope.name}}).
            success(function(data) {
                $scope.greeting = data;
            });
        };

    }]);

