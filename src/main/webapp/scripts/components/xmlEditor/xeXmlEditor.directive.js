"use strict";

angular.module('configeditorApp')
    .directive('xeXmlEditor', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                xmlFile: '='
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlEditor.html',
            link: function (scope, element,  attrs) {

            }
        };
    })
    .directive('xeXmlTagEditor', function($compile, $http, $templateCache) {

        var applyTemplate = function(element, html, scope){
            element.html(html);
            element.replaceWith($compile(element.html())(scope));
        };
        var loadAndApplyTemplate = function(tagName, element, scope) {
            var templateLoader,
                defaultTemplateUrl = 'scripts/components/xmlEditor/xeXmlTagEditor.html',
                baseUrl = 'scripts/components/xmlEditor/templates/',
                templateUrl = baseUrl + tagName + ".html";
            templateLoader = $http.get(templateUrl, {cache: $templateCache});

            templateLoader.error(function (html) {
                templateLoader = $http.get(defaultTemplateUrl, {cache: $templateCache})
                    .success(function (html) {
                        applyTemplate(element,html, scope);
                });
            }).success(function (html) {
                applyTemplate(element, html, scope);
            });
        };
        return {
            restrict: 'E',

            scope: {
                xmlTag: '='
            },
            template: '<div class="well">{{xmlTag.qName}}</div>',
            link: function (scope, element, attrs) {
                scope.$watch("xmlTag.qName", function(newValue) {
                    if(angular.isDefined(newValue)) {
                        loadAndApplyTemplate(newValue, element, scope);
                    }else{
                        console.log("! --- xmlTag is undefined")
                    }
                });

            }
        };
    })
    .directive('xeXmlSubTags', function($compile) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                xmlSubTags: '='
            },
            template: '',
            link: function (scope, element, attrs) {

                scope.$watch("xmlSubTags", function() {
                    if (angular.isArray(scope.xmlSubTags)) {
                        element.append("<xe-xml-tag-editor ng-repeat='subTag in xmlSubTags' xml-tag='subTag'></xe-xml-tag-editor>");
                        $compile(element.contents())(scope)
                    } else {
                        console.log("! --- xmlSubTags is not an array")
                    }
                });
            }
        };
    });






