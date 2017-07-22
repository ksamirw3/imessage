'use strict';
var app = angular.module('mgr', []);
app.value('appSettings', {
    api: 'http://localhost:1337/',
    version: '1.0'
});

app.config(function ($httpProvider) {
// using interceptors to inject the token with request header
    $httpProvider.interceptors.push(['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
            return {
                'request': function (config) {
                    // set header token
                    config.headers = config.headers || {};
                    var userService = $injector.get('userService');
                    var token = userService.getToken();

//                    console.log('token:', token);
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }

                    return config || $q.when(config);
                },
                'response': function (response) {
                    return response || $q.when(response);
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                        $rootScope.$broadcast('userLoggedOut', {});
                        var helper = $injector.get('helper');
                        helper.setMessage('Invalid Access Token');
                    }
                    return $q.reject(response);
                }
            };
        }]);
});


