"use strict";

angular.module('configeditorApp')
    .directive('xeXmlUpload', ["$http", function($http) {

        return {
            restrict: 'E',
            replace: false,
            scope: {
                xmlFile: '=',
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlUpload.html',
            controller: ['$scope', function ($scope) {


            }],
            link: function (scope, element,  attrs) {
                scope.uploadFile = null;
                scope.upload = function() {
                    var fd = new FormData();
                    fd.append('file', scope.uploadFile);
                    $http.post('/api/xmlfile/upload', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                        .success(function (data) {
                            scope.xmlFile = data;
                        });
                };
                scope.loadSample = function() {
                    var fd = new FormData();
                    fd.append('file', scope.uploadFile);
                    $http.get('/api/xmlfile/id/1')
                        .success(function (data) {
                            scope.xmlFile = data;
                        });
                };
            }
        };
    }]);