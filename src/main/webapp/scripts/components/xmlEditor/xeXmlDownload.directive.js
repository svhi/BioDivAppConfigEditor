"use strict";
/**********************************************************************************************************************
 * xeXmlDownload.directive.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlDownload', ['$http', function($http) {

        return {
            restrict: 'E',
            replace: false,
            scope: {
                xmlFileModel: '='
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlDownload.html',
            controller: ['$scope', function ($scope) {


            }],
            link: function (scope, element,  attrs) {
                scope.downloadURL = "/api/xmlfile/download";
                scope.downloadFile = null;

                scope.download = function() {
                    $http.post(scope.downloadURL, scope.xmlFileModel)
                        .success(function (data) {
                            scope.downloadFile = data;
                        });
                };
            }
        };
    }]);