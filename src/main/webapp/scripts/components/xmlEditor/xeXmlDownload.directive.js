"use strict";
/**********************************************************************************************************************
 * xeXmlDownload.directive.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlDownload', ['$http', 'xeXmlFileService', function($http, xeXmlFileService ) {

        return {
            restrict: 'E',
            replace: false,
            scope: {

                form: '=',
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlDownload.html',

            link: function (scope, element,  attrs) {
                scope.downloadURL = "/api/xmlfile/download";
                scope.showDownload = false;
                scope.$watch(xeXmlFileService.getXmlFileModel, function(newValue, oldValue) {
                    scope.showDownload = newValue != null;
                });

                scope.download = function() {
                    $http.post(scope.downloadURL, xeXmlFileService.getXmlFileModel())
                        .success(function (data) {
                            scope.downloadFile = data;
                            scope.form.$setPristine();
                        });
                };
            }
        };
    }]);