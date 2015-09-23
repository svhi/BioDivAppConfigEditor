"use strict";
/******************************************************************************************************************
 * xeXmlFileService
 * Holds the xmlFileModel and provides functions for uploading, downloading and validating.
 ******************************************************************************************************************/
angular.module('configeditorApp')
    .factory('xeXmlFileService', ['$http', 'Upload', function($http, Upload) {
        var srv ={};

        srv._uploadURL = 'api/xmlfile/upload';
        srv._loadSampelURL = 'api/xmlfile/id/1';
        srv._downloadURL = "api/xmlfile/download";
        srv._validateURL = "api/xmlfile/validate";

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
                    'ContentType': file.ContentType
                },
                
                file: file,
                fileFormDataName: 'file'
            });

            file.upload.success(function (data) {
                srv.setXmlFileModel(data);
            });
        };

        srv.loadSample = function() {
            $http.get(srv._loadSampelURL)
                .success(function (data) {
                    srv.setXmlFileModel(data);
                });
        };
        
        //Save/download data generated in JavaScript - http://hackworthy.blogspot.de/2012/05/savedownload-data-generated-in.html
        srv._showSave = null;
        srv._initDownload = function(){
        	
        	var showSave;

        	// Feature test: Does this browser support the download attribute on anchor tags? (currently only Chrome)
        	var DownloadAttributeSupport = 'download' in document.createElement('a');

        	// Use any available BlobBuilder/URL implementation:
        	var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        	var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        	// IE 10 has a handy navigator.msSaveBlob method. Maybe other browsers will emulate that interface?
        	// See: http://msdn.microsoft.com/en-us/library/windows/apps/hh441122.aspx
        	navigator.saveBlob = navigator.saveBlob || navigator.msSaveBlob || navigator.mozSaveBlob || navigator.webkitSaveBlob;

        	// Anyway, HMTL5 defines a very similar but more powerful window.saveAs function:
        	// http://www.w3.org/TR/file-writer-api/#the-filesaver-interface
        	window.saveAs = window.saveAs || window.webkitSaveAs || window.mozSaveAs || window.msSaveAs;
        	// However, this is not supported by any browser yet. But there is a compatibility library that
        	// adds this function to browsers that support Blobs (except Internet Exlorer):
        	// http://eligrey.com/blog/post/saving-generated-files-on-the-client-side
        	// https://github.com/eligrey/FileSaver.js

        	// mime types that (potentially) don't trigger a download when opened in a browser:
        	var BrowserSupportedMimeTypes = {
        		"image/jpeg": true,
        		"image/png": true,
        		"image/gif": true,
        		"image/svg+xml": true,
        		"image/bmp": true,
        		"image/x-windows-bmp": true,
        		"image/webp": true,
        		"audio/wav": true,
        		"audio/mpeg": true,
        		"audio/webm": true,
        		"audio/ogg": true,
        		"video/mpeg": true,
        		"video/webm": true,
        		"video/ogg": true,
        		"text/plain": true,
        		"text/html": true,
        		"text/xml": true,
        		"application/xhtml+xml": true,
        		"application/json": true
        	};

        	// Blobs and saveAs (or saveBlob)	:
        	if (BlobBuilder && (window.saveAs || navigator.saveBlob)) {
        		// Currently only IE 10 supports this, but I hope other browsers will also implement the saveAs/saveBlob method eventually.
        		showSave = function (data, name, mimetype) {
        			if (!name) return;
        			var builder = new BlobBuilder();
        			builder.append(data);
        			var blob = builder.getBlob(mimetype||"application/octet-stream");
        			
        			// I don't assign saveAs to navigator.saveBlob (or the other way around)
        			// because I cannot know at this point whether future implementations
        			// require these methods to be called with 'this' assigned to window (or
        			// naviagator) in order to work. E.g. console.log won't work when not called
        			// with this === console.
        			if (window.saveAs) {
        				window.saveAs(blob, name);
        			}
        			else {
        				navigator.saveBlob(blob, name);
        			}
        		};
        	}
        	// Blobs and object URLs:
        	else if (URL) {
        		// Currently WebKit and Gecko support BlobBuilder and object URLs.
        		showSave = function (data, name, mimetype) {
        			if (!name) return;
        			var blob, 
        				url; 
        			if(BlobBuilder){
	        			var builder = new BlobBuilder();
	        				builder.append(data);
        			}
        			if (!mimetype) mimetype = "application/octet-stream";
        			if (DownloadAttributeSupport) {        				
        				blob = BlobBuilder ? builder.getBlob(mimetype) : new Blob([data], {type: mimetype});        				
        				url = URL.createObjectURL(blob);
        				
        				// Currently only Chrome (since 14-dot-something) supports the download attribute for anchor elements.
        				var link = document.createElement("a");
        				link.setAttribute("href",url);
        				link.setAttribute("download",name);
        				// Now I need to simulate a click on the link.
        				// IE 10 has the better msSaveBlob method and older IE versions do not support the BlobBuilder interface
        				// and object URLs, so we don't need the MS way to build an event object here.
        				var event = document.createEvent('MouseEvents');
        				event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        				link.dispatchEvent(event);
        			}
        			else {
        				// In other browsers I open a new window with the object URL.
        				// In order to trigger a download I have to use the generic binary data mime type
        				// "application/octet-stream" for mime types that browsers would display otherwise.
        				// Of course the browser won't show a nice file name here.
        				if (BrowserSupportedMimeTypes[mimetype.split(";")[0]] === true) {
        					mimetype = "application/octet-stream";
        				}

        				blob = BlobBuilder ? builder.getBlob(mimetype) : new Blob([data], {type: mimetype});
        				url = URL.createObjectURL(blob);
        				window.open(url, '_blank', '');
        			}
        			// The timeout is probably not necessary, but just in case that some browser handle the click/window.open
        			// asynchronously I don't revoke the object URL immediately.
        			setTimeout(function () {
        				URL.revokeObjectURL(url);
        			}, 250);

        			// Using the filesystem API (http://www.w3.org/TR/file-system-api/) you could do something very similar.
        			// However, I think this is only supported by Chrome right now and it is much more complicated than this
        			// solution. And chrome supports the download attribute anyway.
        		};
        	}
        	
        	// data:-URLs:
        	else if (!/\bMSIE\b/.test(navigator.userAgent)) {
        		// IE does not support URLs longer than 2048 characters (actually bytes), so it is useless for data:-URLs.
        		// Also it seems not to support window.open in combination with data:-URLs at all.
        		showSave = function (data, name, mimetype) {
        			if (!name) return;
        			if (!mimetype) mimetype = "application/octet-stream";
        			// Again I need to filter the mime type so a download is forced.
        			if (BrowserSupportedMimeTypes[mimetype.split(";")[0]] === true) {
        				mimetype = "application/octet-stream";
        			}
        			// Note that encodeURIComponent produces UTF-8 encoded text. The mime type should contain
        			// the charset=UTF-8 parameter. In case you don't want the data to be encoded as UTF-8
        			// you could use escape(data) instead.
        			window.open("data:"+mimetype+","+encodeURIComponent(data), '_blank', '');
        		};
        	}
        	// Internet Explorer before version 10 does not support any of the methods above.
        	// If it is text data you could show it in an textarea and tell the user to copy it into a text file.
        	if (!showSave) {
    			alert("Your browser does not support any method of saving JavaScript generated data to files.");
    			return;
    		}else{
    			srv._showSave = showSave;
    		}
        };
        srv._initDownload();
        
        srv.downloadXml= function() {
            $http({
                url: srv._downloadURL,
                method: 'POST',
                responseType: 'arraybuffer',
                data: srv._xmlFileModel,
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/xml'
                }
            })
            .success(function (data) {     
        		srv._showSave(data,
        			srv._xmlFileModel.fileName,
        			"application/xml");               
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
