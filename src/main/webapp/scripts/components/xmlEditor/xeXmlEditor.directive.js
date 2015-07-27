"use strict";

angular.module('configeditorApp')
    .directive('xeXmlEditor', ["$compile", "$http", "$templateCache", function($compile, $http, $templateCache) {
        return {
            restrict: 'E',
            //replace: true,
            scope: {
                xmlFile: '='
            },
            templateUrl: 'scripts/components/xmlEditor/xeXmlEditor.html',
            link: function (scope, element,  attrs) {

                /*var content = element.contents().remove();
                 scope.$watch("xmlFile", function(newValue){
                 if(newValue==null){
                 element.contents().remove();
                 element.html("");
                 }else{
                 element.contents().remove();
                 element.html($compile(content)(scope));
                 }
                 });*/
            }
        };
    }])
    .directive('xeXmlTagEditor',["$compile", "$http", "$templateCache", function($compile, $http, $templateCache) {

        var applyTemplate = function(element, html, scope){
            element.contents().remove();
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

        var addTag = function(tagArray, newTag, index){
            if(!angular.isArray(tagArray)){return;}
            if(angular.isDefined(index)) {
                tagArray.splice(index, 0, newTag);
            }else{
                tagArray.push(newTag);
            }
            //return tagArray;
        }

        var addTagBefore = function (tagArray, newTag , existingTag){
            addTag(tagArray, newTag, tagArray.indexOf(xmlTag));
        }
        var addTagAfter = function (tagArray, newTag , existingTag){
            addTag(tagArray, newTag, tagArray.indexOf(xmlTag)+1);
        }

        var removeTag = function(array, xmlTag) {
            if(!angular.isArray(array)){return;}
            if(!angular.isDefined(xmlTag)){return;}

            var index = array.indexOf(xmlTag);
            array.splice(index, 1);

        }

        var Tag = function(qName, value, attributes, subTags){
            return {
                qName: qName,
                value: value,
                attributes: attributes,
                subTags: subTags
            };
        }

        var Attribute = function(qName, value){
            return {
                qName: qName,
                value: value
            };
        }

        return {
            restrict: 'E',
            //replace: true,
            scope: {
                xmlTag: '=',
            },
            //template: '<div class="well">{{xmlTag.qName}}</div>',

            link: function (scope, element, attrs) {
                //console.log("link - " + scope.xmlTag + " >>>>>>>>>>>>>>>>>>>>>>>");

                scope.addTag = addTag;
                scope.addTagBefore = addTagBefore;
                scope.addTagAfter = addTagAfter;
                /*Helpers to create tags and attributes >>>>>>*/
                scope.Tag = Tag;
                scope.Attr = Attribute;
                /* <<<<<<<<<<<< */
                scope.removeTag = removeTag;

                /* Watches Changes of qName in order to load a new template*/
                scope.$watch("xmlTag.qName", function(newValue, oldValue) {
                    //console.log(newValue + " | EVAL ----" )

                    if(angular.isDefined(newValue)) {
                        console.log(newValue + "_" + scope.xmlTag.$$hashKey + " | EVAL " + newValue + " : " + oldValue )
                        //console.log(newValue + "_" + scope.xmlTag.$$hashKey + " | " + angular.isFunction(scope.$parent.addTag) + " | " + angular.isFunction(scope.$parent.$parent.addTag));

                        loadAndApplyTemplate(newValue, element, scope);
                    }
                });

                //console.log("<<<<<<<<<<<<<<<<<<<<<<<<< link");
            }
        };
    }])
/*******************************************************************************************************************
 * The subtags directive is used to render the teg directive rucursivly for all the subtags within it. it only
 * renders a new directive if there is an array of subtags defined.
 * This trick is necessary to avoid an endless loop!!!
 ******************************************************************************************************************/
    .directive('xeXmlSubTags', ["$compile", "filterTagQNameFilter", function($compile, filterTagQNameFilter) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                xmlTag: '=',
                qNameIncludeFilter: '@',
                qNameExcludeFilter: '@',
            },
            //template: "<xe-xml-tag-editor ng-repeat='subTag in filteredSubTags ' xml-tag='subTag'></xe-xml-tag-editor>",
            link: function (scope, element, attrs) {
                var isShown = false;
                scope.$watchCollection("xmlTag.subTags", function(newValue, oldValue) {
                    if (angular.isArray(newValue)) {

                        console.log(scope.xmlTag.qName + "_" + scope.xmlTag.$$hashKey + " | SUBTAGS EVAL" + "\n - " + newValue)

                        if (!isShown) {
                            // Removing all contents and old listeners
                            element.contents().remove();
                            element.html("<xe-xml-tag-editor ng-repeat='subTag in xmlTag.subTags | filterTagQName :qNameIncludeFilter :qNameExcludeFilter ' xml-tag='subTag'></xe-xml-tag-editor>");
                            $compile(element.contents())(scope);

                            isShown = true;
                        }
                    }else{
                        element.contents().remove();
                        //element.html("<xe-xml-tag-editor ng-repeat='subTag in filteredSubTags ' xml-tag='subTag'></xe-xml-tag-editor>");
                        $compile(element.contents())(scope);
                        isShown = false;
                    }
                });
            }
        };
    }])
    .filter('filterTagQName', function() {
        return function(tags, includeQNames, excludeQNames) {
            if (!angular.isArray(tags)){return tags;}
            if(!angular.isDefined(includeQNames) && !angular.isDefined(excludeQNames)){return tags;}
            if(includeQNames == '' && excludeQNames == ''){return tags;}

            var includeQNameArray = angular.isDefined(includeQNames) ? includeQNames.split(' ') : [];
            var excludeQNameArray = angular.isDefined(excludeQNames) ?  excludeQNames.split(' ') : [];

            //tags = tags || [];
            var out = [];
            tags.forEach(function(tag){
                var include = includeQNameArray.length == 0,
                    exclude = false;
                includeQNameArray.forEach(function(includeQNameFilter){
                        if (angular.isDefined(tag.qName) && tag.qName == includeQNameFilter){
                            include = true;
                        }
                    }
                )
                excludeQNameArray.forEach(function(excludeQNameFilter){
                        if (angular.isDefined(tag.qName) && tag.qName == excludeQNameFilter){
                            exclude = true;
                        }
                    }
                )

                if(include && !exclude){
                    out.push(tag);
                }
            });
            return out;
        };
    });

