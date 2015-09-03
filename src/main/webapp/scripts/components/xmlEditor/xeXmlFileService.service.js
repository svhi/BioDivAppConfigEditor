"use strict";

angular.module('configeditorApp')

    .factory('xeXmlFileService', ['$http', function($http) {
        var srv ={};

        srv._uploadURL = '/api/xmlfile/upload';
        srv._loadSampelURL = '/api/xmlfile/id/1';
        srv._downloadURL = "/api/xmlfile/download";

        // Service data
        srv._xmlFileModel =  null;

        // Service implementation
        srv.setXmlFileModel = function(data) {
            srv._xmlFileModel = angular.copy(data);
        };
        srv.getXmlFileModel = function() {
            return srv._xmlFileModel;
        };
        srv.reset = function() {
            srv._xmlFileModel.tag.subTags = [];
            srv._xmlFileModel.tag = null;
            srv._xmlFileModel = null;
        };
        srv.uploadXml = function(uploadFile) {
            var fd = new FormData();
            fd.append('file', uploadFile);
            $http.post(srv._uploadURL, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function (data) {
                    srv.setXmlFileModel(data);
                });
        };
        srv.loadSample = function() {
            $http.get(srv._loadSampelURL)
                .success(function (data) {
                    srv.setXmlFileModel(data);
                });
        };
        srv.downloadXml= function() {
            return $http.post(srv._downloadURL, srv._xmlFileModel);

        };

        // Helper function for creating new Tags.
        srv.Tag = function (qName, value, attributes, subTags) {
            return {
                qName: qName,
                value: value,
                attributes: attributes,
                subTags: subTags
            };
        };

        // Helper function for creating ne attributes.
        srv.Attribute =  function (qName, value) {
            return {
                qName: qName,
                value: value
            };
        }

        // Public API
        return {
            getXmlFileModel: function() {
                return srv.getXmlFileModel();
            },
            setXmlFileModel: function(data) {
                srv.setXmlFileModel(data);
            },
            reset: function(){
                srv.reset();
            },
            uploadXml: function(uploadFile){
                srv.uploadXml(uploadFile);
            },
            loadSample: function(){
                srv.loadSample();
            },
            downloadXml: function(){
                return srv.downloadXml();
            },
            util: {
                Tag: function(qName, value, attributes, subTags){
                    return srv.Tag(qName, value, attributes, subTags);
                },
                Attribute: function (qName, value) {
                    return srv.Attribute(qName, value);
                }
            }
        };
    }]);