"use strict";

angular.module('configeditorApp')
    .directive('xeXmlEditor', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                xmlFile: '='
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlEditor.html'
        };
    })

/******************************************************************************************************************
 * This directive handels the template loading and provides function for adding and removing tags.
 ******************************************************************************************************************/
    .directive('xeXmlTagEditor',["$compile", "$http", "$templateCache", function($compile, $http, $templateCache) {
        /* Contains all helper functions*/
        var util = {
            applyTemplate: function (element, html, scope) {
                // remove previous content
                element.contents().remove();
                // Compile the new contents
                var compiledContents = $compile(html);
                // Re-add the compiled contents to the element
                compiledContents(scope, function (clone) {
                    element.append(clone);
                });

            },

            loadAndApplyTemplate: function (tagName, element, scope) {
                var templateLoader,
                    defaultTemplateUrl = 'scripts/components/xmlEditor/xeXmlTagEditor.html',
                    baseUrl = 'scripts/components/xmlEditor/templates/',
                    templateUrl = baseUrl + tagName + ".html";
                templateLoader = $http.get(templateUrl, {cache: $templateCache});

                templateLoader.error(function () {
                    templateLoader = $http.get(defaultTemplateUrl, {cache: $templateCache})
                        .success(function (html) {
                            util.applyTemplate(element, html, scope);
                        });
                }).success(function (html) {
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
        return {
            restrict: 'E',
            replace: true,
            scope: {
                xmlTag: '='
            },
            template: '<div class="xe-xml-tag"><div class="well text-muted"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> <span>{{xmlTag.qName}}</span></div></div>',

            link: function ($scope, element, attrs) {
                //console.log("link - " + $scope.xmlTag + " >>>>>>>>>>>>>>>>>>>>>>>");

                $scope.addTag = util.addTag;
                /* $parent is used to access the parent $scope
                   1. $parent = ng-repeat
                   2. $parent = xeXmlSubTags
                   3. $parent = xeXmlTagEditor */
                $scope.addTagBefore = function(newTag){util.addTagBefore($scope.$parent.$parent.$parent.xmlTag.subTags, newTag, $scope.xmlTag);};
                $scope.addTagAfter = function(newTag){util.addTagAfter($scope.$parent.$parent.$parent.xmlTag.subTags, newTag, $scope.xmlTag);}
                $scope.removeTag = function(){util.removeTag($scope.$parent.$parent.$parent.xmlTag.subTags, $scope.xmlTag);};
                $scope.moveUp = function(){util.moveUp($scope.$parent.$parent.$parent.xmlTag.subTags, $scope.xmlTag );};
                $scope.isFirst = function(){
                    return $scope.$parent.$first;
                }
                $scope.isLast = function(){
                    return $scope.$parent.$last;
                }

                /*Helpers to create tags and attributes >>>>>>*/
                $scope.XmlTag = util.Tag;
                $scope.XmlAttr = util.Attribute;
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

                /* Watches Changes of qName in order to load a new template*/
                var isCompiled = false;
                $scope.$watch("xmlTag.qName", function(newValue, oldValue) {
                    //console.log(newValue + " | EVAL ----" )
                    if(angular.isDefined(newValue)) {
                        if(!isCompiled || !angular.isDefined(oldValue) || (newValue != oldValue)) {
                            //console.log(newValue + "_" + $scope.xmlTag.$$hashKey + " | EVAL " + newValue + " : " + oldValue);
                            //console.log(newValue + "_" + $scope.xmlTag.$$hashKey + " | " + angular.isFunction($scope.$parent.addTag) + " | " + angular.isFunction($scope.$parent.$parent.addTag));
                            util.loadAndApplyTemplate(newValue, element, $scope);
                            isCompiled = true;
                        }
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
                xmlTag: '=',
                qNameIncludeFilter: '@',
                qNameExcludeFilter: '@'
            },
            template: '<div class="xe-subTag-container"><xe-xml-tag-editor ng-repeat="subTag in xmlTag.subTags | filterTagQName :qNameIncludeFilter :qNameExcludeFilter" xml-tag="subTag"></xe-xml-tag-editor></div>',
            compile:function(element) {
                return RecursionHelper.compile(element, function ($scope, element, attrs, controller, transcludeFn) {
                    /* Define your normal link function here.
                       Alternative: instead of passing a function, you can also pass an object with a 'pre'- and 'post'-link function.*/
                });
            }

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

