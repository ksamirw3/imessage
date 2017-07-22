'use strict';
(function () {
    var factory = function ($http, helper) {


        var response = {
           
            getMessages: function () {
                return $http.get(helper.getSetting('api') + 'message/');
            },
            postMessages: function (message) {
                return $http.post(helper.getSetting('api') + 'message/create', message);
            }
        };


        return response;
    };
    factory.$inject = ['$http', 'helper'];
    angular.module('mgr').factory('timelineService', factory);
}());