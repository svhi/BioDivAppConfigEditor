"use strict";
/**********************************************************************************************************************
 * xeXmlDownload.directive.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlDownload', ['xeXmlFileService', function(xeXmlFileService ) {

        return {
            restrict: 'E',
            replace: false,
            scope: {

                form: '=',
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlDownload.html',

            link: function (scope, element,  attrs) {
                scope.downloadFile = null;

                scope.showDownload = false;
                scope.$watch(xeXmlFileService.getXmlFileModel, function(newValue, oldValue) {
                    scope.showDownload = newValue != null;
                });

                scope.download = function() {
                    xeXmlFileService.downloadXml()
                        .success(function (data) {
                            scope.downloadFile = data;
                            scope.form.$setPristine();
                        });

                };

                scope.validate = function() {
                    xeXmlFileService.validateXml();
                };
            }
        };
    }]);