'use strict';

angular.module('configeditorApp')
    .controller('XmlFileController', ['$scope', '$http', function ($scope, $http) {
        $scope.xmlURL = '/api/xmlfile/'
        //$scope.xmlID = 1;
        $scope.xmlFileModel = null;
        //console.log("loading data...");
        /*
        $http.get('/api/xmlfile/1').
            success(function(data) {
                $scope.xmlFileModel = data;
                console.log("data:\n" + data);
            });
        */
    }]);