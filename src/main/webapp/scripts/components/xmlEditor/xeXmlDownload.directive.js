"use strict";
/**********************************************************************************************************************
 * xeXmlDownload.directive.js
 * Renders two buttons, one for validation and one for downloading.
 * validation -> Sends xmlFile model to the server and retrieves it with updated validationMessages.
 * download ->   Sends xmlFileModel to the server and retrieves the written xml file. Creates an ObjectURL
 *               in order to start the file download on the clients browser.
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlDownload', ['xeXmlFileService', 'xeXmlFormService', function(xeXmlFileService, xeXmlFormService ) {

        return {
            restrict: 'E',
            replace: false,
            scope: {},
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
                    scope.form.$setPristine();  //Let from now that the current changes are downloaded.
                };

                scope.validate = function() {
                    xeXmlFileService.validateXml();
                };
            }
        };
    }]);