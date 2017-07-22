'use strict';
(function () {
    var factory = function (appSettings) {



        var response = {
            getSetting: function (key) {
                return appSettings[key];
            },
            setMessage: function (msg) {
                return alert(msg);
            }
        };
        return response;
    };

    factory.$inject = ['appSettings'];
    angular.module('mgr').factory('helper', factory);
}());