// Create an application module for our demo.
angular.module("Demo", [])
    .directive('item',["$compile", function($compile) {

        var applyTemplate = function(element, html, scope){
            element.contents().remove();
            element.html(html);
            element.replaceWith($compile(element.html())(scope));
        };

        var addTag = function(tagArray, newTag, index){
            if(!angular.isArray(tagArray)){return;}
            if(angular.isDefined(index)) {
                tagArray.splice(index, 0, newTag);
            }else{
                tagArray.push(newTag);
            }
        }
        var removeTag = function(array, xmlTag) {
            if(!angular.isArray(array)){return;}
            if(!angular.isDefined(xmlTag)){return;}

            var index = array.indexOf(xmlTag);
            array.splice(index, 1);

        }

        return {
            restrict: 'E',
            //replace: true,
            scope: {
                item: '=',
            },
            //template: '<li>{{item.id}} : {{item.value}}</li>',

            link: function (scope, element, attrs) {

                scope.addTag = addTag;
                scope.removeTag = removeTag;

                /* Watches Changes of qName in order to load a new template*/
                scope.$watch("xmlTag.qName", function(newValue, oldValue) {
                    //console.log(newValue + " | EVAL ----" )

                    if(angular.isDefined(newValue)) {

                        applyTemplate(
                            element,
                            '<li>{{item.id}} : {{item.value}} <collection item="item"</li>',
                            scope);
                    }
                });
            }
        };
    }])

.directive('collection', ["$compile", function($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            item: '=',

        },
        template: '',
        link: function (scope, element, attrs) {
            scope.filteredSubTags =  [];

            var isShown = false;
            scope.$watchCollection("item.collection", function(newValue, oldValue) {
                if (angular.isArray(newValue)) {
                    if (!isShown) {
                        // Removing all contents and old listeners
                        element.contents().remove();
                        element.html("<item ng-repeat='subItem in item.collection' item='subItem'></xe-xml-tag-editor>");
                        $compile(element.contents())(scope);

                        isShown = true;
                    }
                }else{
                    element.contents().remove();
                    $compile(element.contents())(scope);
                    isShown = false;
                }
            });
        }
    };
}])
    .controller(
    "AppController",
    function ($scope) {

        // I am the collection being watched.
        $scope.mainItem =
        {
            id: 1,
            value: 0,
            collection: [
                {
                    id: 11,
                    value: "1.1 test"
                },
                {
                    id: 12,
                    value: "1.2 test",
                    collection: [
                        {
                            id: 11,
                            value: "1.1 test"
                        },
                        {
                            id: 12,
                            value: "1.2 test"
                        }
                    ]
                }
            ]
        };





        // Change a deep value in an existing item on in the
        // current collection.
        $scope.changeDeepValue = function () {
            // Add new item to collection.
            $scope.collection[0].value = now();
        };

        // Add a new item to the collection, causing a change
        // in the shallow topology of the collection.
        $scope.changeShallowValue = function () {

            // Add new item to collection.
            $scope.collection.splice(0,0,{
                id: ($scope.collection.length + 1),
                value: now()
            });

        };

        // I clear the log items.
        $scope.clear = function () {
            $scope.watchCollectionLog = [];
            $scope.watchLog = [];
            $scope.watchEqualityLog = [];
        };

        // I return the current UTC milliseconds.
        function now() {
            return ((new Date()).toUTCString());
        }
    }
);