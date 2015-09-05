"use strict";
/**********************************************************************************************************************
 * xeXmlDownload.directive.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlDownload', ['xeXmlFileService', 'xeXmlFormService', function(xeXmlFileService, xeXmlFormService ) {

        return {
            restrict: 'E',
            replace: false,
            scope: {


            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlDownload.html',

            link: function (scope, element,  attrs) {
                scope.showDownload = false;
                scope.validationOK = true;
                scope.form = xeXmlFormService.getForm();

                scope.$watch(xeXmlFileService.getXmlFileModel, function(newValue, oldValue) {
                    scope.showDownload = newValue != null;
                });

                scope.$watch(xeXmlFileService.getValidationMessages, function(newValue, oldValue) {
                    scope.validationOK = newValue == null || (newValue.length == 0);
                });

                scope.download = function() {
                    xeXmlFileService.downloadXml();
                    scope.form.$setPristine();
                };

                scope.validate = function() {
                    xeXmlFileService.validateXml();
                };
            }
        };
    }]);