"use strict";
/**********************************************************************************************************************
 * xeXmlUpload.directive.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlUpload', ['xeXmlFileService', function(xeXmlFileService) {

        return {
            restrict: 'E',
            replace: false,
            scope: {

            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlUpload.html',
            controller: ['$scope', function ($scope) {


            }],
            link: function (scope, element,  attrs) {
                scope.uploadFile = null;

                scope.xmlFileIsSet = false;
                scope.xmlFileName = null;

                scope.$watch(xeXmlFileService.getXmlFileModel, function(newValue, oldValue) {
                    scope.xmlFileIsSet = newValue != null;
                    scope.xmlFileName = (newValue!=null && angular.isDefined(newValue.fileName)) ? newValue.fileName : null;
                });

                scope.upload = function() {
                    xeXmlFileService.uploadXml(scope.uploadFile);
                };
                scope.loadSample = function() {
                    xeXmlFileService.loadSample();
                };

                scope.reset = function(){
                    scope.uploadFile=null;
                    xeXmlFileService.reset();
                }
            }
        };
    }]);