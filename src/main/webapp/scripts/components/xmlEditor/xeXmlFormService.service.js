"use strict";
/******************************************************************************************************************
 * xeXmlFormService
 * Holds the xmlFileForm and provides access to it.
 ******************************************************************************************************************/
angular.module('configeditorApp')
    .factory('xeXmlFormService',  function() {
        var srv ={};

        // Service data
        //-----------------------------------------------------------------
        srv._form =  null;

        // Service implementation
        //-----------------------------------------------------------------
        srv.getForm = function() {
            //console.log(srv._form);
            return srv._form;
        };
        srv.setForm = function(newForm) {
            srv._form = newForm;
            //console.log(srv._form);
        };


        // Public API
        //-----------------------------------------------------------------
        return {
            /* Returns the form. */
            getForm: function() {
                return srv.getForm();
            },
            /* Sets the form. */
            setForm: function(newForm) {
                srv.setForm(newForm);
            }
        };
    });