"use strict";

angular.module('configeditorApp')
/**********************************************************************************************************************
 * xeXmlEditor.directive.js
 *********************************************************************************************************************/
    .directive('xeXmlEditor', ['xeXmlFileService', function(xeXmlFileService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            templateUrl: 'scripts/components/xmlEditor/xeXmlEditor.html',
            link: function ($scope, element, attrs) {
                $scope.showEditor =  false;
                $scope.xmlStartTag =  null;

                $scope.$watch(xeXmlFileService.getXmlFileModel, function(newValue, oldValue) {
                    $scope.showEditor = newValue != null;
                    $scope.xmlStartTag = (newValue!=null && angular.isDefined(newValue.tag)) ? newValue.tag : null;
                });
            }
        };
    }])

    .factory('xeXmlFileService', function() {
        var service = {
            xmlFileModel: null,
            getXmlFileModel: function() {
                return service.xmlFileModel;
            },
            setXmlFileModel: function(data) {
                service.xmlFileModel = data;
            },
            reset: function(){
                service.xmlFileModel.tag.subTags = [];
                service.xmlFileModel.tag = null;
                service.xmlFileModel = null;
            }
        }
        return service;
    })


/******************************************************************************************************************
 * This service provides all helper functions for xeXmlTagEditor.
 ******************************************************************************************************************/
    .factory('xeXmlTagEditorUtils', ["$compile", "$http", "$templateCache", function($compile, $http, $templateCache) {
        var util = {

            /*Applies a angular template to a given element*/
            applyTemplate: function (element, html, scope) {
                // Remove previous content
                element.contents().remove();
                // Compile the new contents
                var compiledContents = $compile(html);
                // Link the template to a scope and re-add the compiled contents to the element
                compiledContents(scope, function (clone) {
                    element.append(clone);
                });
            },

            /*Loads a angular template based on the name of a xml tag. If no suitable
            template is available the default template will be used. $templateCache is
            used to reduce calls to the server */
            loadAndApplyTemplate: function (tagName, element, scope) {
                var templateLoader,
                    defaultTemplateUrl = 'scripts/components/xmlEditor/xeXmlTagEditor.html',
                    baseUrl = 'scripts/components/xmlEditor/templates/',
                    templateUrl = baseUrl + tagName + ".html";

                templateLoader = $http.get(templateUrl, {cache: $templateCache});
                // On error: use default template
                templateLoader
                    .error(function () {
                        $http.get(defaultTemplateUrl, {cache: $templateCache})
                            // Apply default template
                            .success(function (html) {
                                util.applyTemplate(element, html, scope);
                            });
                    })
                    // On success: apply template
                    .success(function (html) {
                        util.applyTemplate(element, html, scope);
                    });
            },

            addTag: function (tagArray, newTag, index) {
                if (!angular.isArray(tagArray)) {
                    return;
                }
                if (angular.isDefined(index)) {
                    tagArray.splice(index, 0, newTag);
                } else {
                    tagArray.push(newTag);
                }
            },

            addTagBefore: function (tagArray, newTag, existingTag) {
                util.addTag(tagArray, newTag, tagArray.indexOf(existingTag));
            },

            addTagAfter: function (tagArray, newTag, existingTag) {
                util.addTag(tagArray, newTag, tagArray.indexOf(existingTag) + 1);
            },

            removeTag: function (array, xmlTag) {
                if (!angular.isArray(array)) {
                    return;
                }
                if (!angular.isDefined(xmlTag)) {
                    return;
                }
                var index = array.indexOf(xmlTag);
                array.splice(index, 1);
            },

            moveToIndex: function(array, xmlTag, index){
                util.removeTag(array, xmlTag);
                util.addTag(array, xmlTag, index);
            },
            moveUp: function(array, xmlTag){
                var index = array.indexOf(xmlTag) - 1;
                util.moveToIndex(array, xmlTag, index);
            },

            // Helper function for creating new Tags.
            Tag: function (qName, value, attributes, subTags) {
                return {
                    qName: qName,
                    value: value,
                    attributes: attributes,
                    subTags: subTags
                };
            },

            // Helper function for creating ne attributes.
            Attribute: function (qName, value) {
                return {
                    qName: qName,
                    value: value
                };
            }
        };
        return util;
    }])
/******************************************************************************************************************
 * This directive handels the template loading and provides function for adding and removing tags.
 ******************************************************************************************************************/
    .directive('xeXmlTagEditor',["xeXmlTagEditorUtils", function(xeXmlTagEditorUtils) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                xmlTag: '='
            },
            template: '<div class="xe-xml-tag"><div class="well text-muted"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> <span>{{xmlTag.qName}}</span></div></div>',

            link: function ($scope, element, attrs) {
                //console.log("link - " + $scope.xmlTag + " >>>>>>>>>>>>>>>>>>>>>>>");

                $scope.addTag = xeXmlTagEditorUtils.addTag;
                /* $parent is used to access the parent $scope
                   1. $parent = ng-repeat
                   2. $parent = xeXmlSubTags
                   3. $parent = xeXmlTagEditor */
                $scope.addTagBefore = function(newTag){xeXmlTagEditorUtils.addTagBefore($scope.$parent.$parent.$parent.xmlTag.subTags, newTag, $scope.xmlTag);};
                $scope.addTagAfter = function(newTag){xeXmlTagEditorUtils.addTagAfter($scope.$parent.$parent.$parent.xmlTag.subTags, newTag, $scope.xmlTag);}
                $scope.removeTag = function(){xeXmlTagEditorUtils.removeTag($scope.$parent.$parent.$parent.xmlTag.subTags, $scope.xmlTag);};
                $scope.moveUp = function(){xeXmlTagEditorUtils.moveUp($scope.$parent.$parent.$parent.xmlTag.subTags, $scope.xmlTag );};

                $scope.isFirst = function(){
                    return $scope.$parent.$first;
                }
                $scope.isLast = function(){
                    return $scope.$parent.$last;
                }

                /*Helpers to create tags and attributes >>>>>>*/
                $scope.XmlTag = xeXmlTagEditorUtils.Tag;
                $scope.XmlAttr = xeXmlTagEditorUtils.Attribute;
                /* <<<<<<<<<<<< */

                // Helper function that evaluate if a Tag with the given qName is present within the subtags array.
                // Possible usecase: show create button only if tag is not present yet.
                $scope.doSubTagsContain = function(qName){
                    if($scope.xmlTag==null || !angular.isArray($scope.xmlTag.subTags) ||  $scope.xmlTag.subTags.length == 0) return false;
                    var doesContainQName = false;
                    $scope.xmlTag.subTags.forEach(function (element) {
                        if(angular.isDefined(element.qName)){
                            if(element.qName === qName){
                                doesContainQName = true;
                            }
                        }
                    });
                    return doesContainQName;
                };

                /* Watches changes of qName in order to load a new template*/
                var isCompiled = false; // Makes sure the template is compiled at least once
                $scope.$watch("xmlTag.qName", function(newValue, oldValue) {
                    if(angular.isDefined(newValue) && newValue!=='') {
                        // Load template when qName is first set, afterwards only on changes
                        if(!isCompiled || (newValue !== oldValue)) {
                            xeXmlTagEditorUtils.loadAndApplyTemplate(newValue, element, $scope);
                            if(isCompiled) isCompiled = true;
                        }
                    }
                });

                /* Watches xmlTag to destroy the scope if it is set to null in order to prevent memory leaks*/
                $scope.$watch("xmlTag", function(newValue, oldValue) {
                    if(newValue == null) {
                        $scope.$destroy()
                    }
                });
                //console.log("<<<<<<<<<<<<<<<<<<<<<<<<< link");
            }
        };
    }])
/*******************************************************************************************************************
 * The subtags directive is used to render the tag directive recursivly for all given subtags.
 ******************************************************************************************************************/
    .directive('xeXmlSubTags', ["$compile","RecursionHelper", function($compile, RecursionHelper) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                subTags: '=',
                qNameIncludeFilter: '@',
                qNameExcludeFilter: '@'
            },
            template:
                '<div class="xe-subTag-container">' +
                    '<xe-xml-tag-editor ng-repeat="subTag in subTags | filterTagQName :qNameIncludeFilter :qNameExcludeFilter" xml-tag="subTag"></xe-xml-tag-editor>' +
                '</div>'
        };
    }])
/*******************************************************************************************************************
 * Filters an array of subTags based on the tags qName.
 ******************************************************************************************************************/
    .filter('filterTagQName', function() {
        return function(tags, includeQNames, excludeQNames) {
            if (!angular.isArray(tags)){return tags;}
            if(!angular.isDefined(includeQNames) && !angular.isDefined(excludeQNames)){return tags;}
            if(includeQNames == '' && excludeQNames == ''){return tags;}

            var includeQNameArray = angular.isDefined(includeQNames) ? includeQNames.split(' ') : [];
            var excludeQNameArray = angular.isDefined(excludeQNames) ?  excludeQNames.split(' ') : [];

            var out = [];
            tags.forEach(function(tag){
                var include = includeQNameArray.length == 0,
                    exclude = false;
                includeQNameArray.forEach(function(includeQNameFilter){
                        if (angular.isDefined(tag.qName) && tag.qName == includeQNameFilter){
                            include = true;
                        }
                    }
                );
                excludeQNameArray.forEach(function(excludeQNameFilter){
                        if (angular.isDefined(tag.qName) && tag.qName == excludeQNameFilter){
                            exclude = true;
                        }
                    }
                );

                if(include && !exclude){
                    out.push(tag);
                }
            });
            return out;
        };
    });

