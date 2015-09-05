"use strict";

angular.module('configeditorApp')

    .factory('xeXmlFileService', ['$http', 'Upload', function($http, Upload) {
        var srv ={};

        srv._uploadURL = '/api/xmlfile/upload';
        srv._loadSampelURL = '/api/xmlfile/id/1';
        srv._downloadURL = "/api/xmlfile/download";
        srv._validateURL = "/api/xmlfile/validate";

        // Service data
        //-----------------------------------------------------------------
        srv._xmlFileModel =  null;

        // Service implementation
        //-----------------------------------------------------------------
        //
        srv.setXmlFileModel = function(data) {
            srv._xmlFileModel = angular.copy(data);
        };
        srv.getXmlFileModel = function() {
            return srv._xmlFileModel;
        };
        srv.getValidationMessages = function() {
            return  srv._xmlFileModel==null ? null : srv._xmlFileModel.validationMessages;
        };
        srv.reset = function() {
            srv._xmlFileModel.tag.subTags = [];
            srv._xmlFileModel.tag = null;
            srv._xmlFileModel = null;
        };
        srv.uploadXml = function(file) {
            file.upload = Upload.upload({
                url: srv._uploadURL,
                method: 'POST',
                headers: {
                    'ContentType': file.ContetnType
                },
                //fields: {username: $scope.username},
                file: file,
                fileFormDataName: 'file'
            });

            file.upload.success(function (data) {
                srv.setXmlFileModel(data);
            });
        }


        srv.loadSample = function() {
            $http.get(srv._loadSampelURL)
                .success(function (data) {
                    srv.setXmlFileModel(data);
                });
        };
        srv.downloadXml= function() {
            $http({
                url: srv._downloadURL,
                method: 'POST',
                responseType: 'arraybuffer',
                data: srv._xmlFileModel,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'text/xml'
                }
            })
            .success(function (data) {
                var blob = new Blob([data], {type: "text/xml"});
                var objectUrl = URL.createObjectURL(blob);

                var hiddenElement = document.createElement('a');
                hiddenElement.href = objectUrl;
                hiddenElement.target = '_blank';
                hiddenElement.download = srv._xmlFileModel.fileName;
                hiddenElement.click();

                URL.revokeObjectURL(objectUrl)
            });
        };
        srv.validateXml= function() {
            return $http.post(srv._validateURL, srv._xmlFileModel)
                .success(function (data) {
                    srv._xmlFileModel.validationMessages = data.validationMessages;
                });
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
        //-----------------------------------------------------------------
        return {
            /* Returns the current xml file model. */
            getXmlFileModel: function() {
                return srv.getXmlFileModel();
            },
            /* Returns the current xml file model. */
            getValidationMessages: function() {
                return srv.getValidationMessages();
            },
            /* Resets the service. */
            reset: function(){
                srv.reset();
            },
            /* Uploads a given xml file to the server to retrieve
              a xml file model based on the xml file.*/
            uploadXml: function(uploadFile){
                srv.uploadXml(uploadFile);
            },
            /* Loads the xml file model for a sampel file from the server*/
            loadSample: function(){
                srv.loadSample();
            },
            /* Sends the xml file model to the server to retrieve
               a xml file base on the given model.*/
            downloadXml: function(){
                return srv.downloadXml();
            },
            /* Sends the xml file model to the server to retrieve
               a xml file base on the given model.*/
            validateXml: function(){
                srv.validateXml();
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