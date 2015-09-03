"use strict";
/**********************************************************************************************************************
 * xeXmlUpload.directive.js
 *********************************************************************************************************************/
angular.module('configeditorApp')
    .directive('xeXmlUpload', ['$http', 'xeXmlFileService', function($http, xeXmlFileService) {

        return {
            restrict: 'E',
            replace: false,
            scope: {

            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlUpload.html',
            controller: ['$scope', function ($scope) {


            }],
            link: function (scope, element,  attrs) {
                scope.xmlFile = null;
                scope.xmlFileIsSet = false;
                scope.xmlFileName = null;
                scope.uploadFile = null;

                scope.$watch(xeXmlFileService.getXmlFileModel, function(newValue, oldValue) {
                    scope.xmlFileIsSet = newValue != null;
                    scope.xmlFileName = (newValue!=null && angular.isDefined(newValue.fileName)) ? newValue.fileName : null;
                });

                scope.upload = function() {
                    var fd = new FormData();
                    fd.append('file', scope.uploadFile);
                    $http.post('/api/xmlfile/upload', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                        .success(function (data) {
                            xeXmlFileService.setXmlFileModel(data);
                        });
                };
                scope.loadSample = function() {
                    var fd = new FormData();
                    fd.append('file', scope.uploadFile);
                    $http.get('/api/xmlfile/id/1')
                        .success(function (data) {
                            xeXmlFileService.setXmlFileModel(data);
                        });
                };

                scope.reset = function(){
                    scope.uploadFile=null;
                    xeXmlFileService.reset(null);
                }
            }
        };
    }]);