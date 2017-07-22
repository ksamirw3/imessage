'use strict';
(function () {
    var factory = function ($http, helper) {

        var service = {
            user: null,
            token: null
        }

        var response = {
            login: function (user) {
                return $http.post(helper.getSetting('api') + 'user/login', user);
            },
            register: function (user) {
                return $http.post(helper.getSetting('api') + 'user/create', user);
            },
            setUser: function (val) {
                service.user = val;
            },
            getUser: function () {
                return service.user;
            },
            setToken: function (val) {
                service.token = val;
            },
            getToken: function () {
                return service.token;
            }
        };


        return response;
    };
    factory.$inject = ['$http', 'helper'];
    angular.module('mgr').factory('userService', factory);
}());