'use strict';
var app = angular.module('mgr', []);
app.value('appSettings', {
    api: 'http://localhost:1337/',
    version: '1.0'
});

app.config(function ($httpProvider) {

    $httpProvider.interceptors.push(['$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
            return {
                'request': function (config) {
                    // set header token
                    config.headers = config.headers || {};
                    var service = $injector.get('service');
                    var token = service.getToken();

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

// timeline controller
(function () {
    var controller = function ($scope, service, helper) {

        $scope.me = null;
        $scope.selected_user = null;
        $scope.users_list = null;
        $scope.messages = [];

//        var socket = io.connect('http://localhost:3000');
        $scope.msgs = [];


        $scope.$on('userLogged', function (event, data) {
//                console.log('userLogged', data);
            service.getMessages().then(function (response) {
                var res = response.data;
                if (res.error) {
                    console.log(res.error);
                    return false;
                }
                $scope.messages = res
            });

            $scope.me = data;
//            socket.emit('userLogin', data.id);
            
            io.socket.get(helper.getSetting('api') + 'message/subscribe', function(data, jwr) {
                io.socket.on('new_message', function(message) {

                      console.log('socket message', message);
                      
                      $scope.$apply(function(){
                          $scope.messages.unshift(message);
                      });
                      
                });
        });


        });

        $scope.$on('userLoggedOut', function (event, data) {
            $scope.me = null;
        });

        //function to send messages.
        $scope.send_msg = function ($event) {
            var keyCode = $event.which || $event.keyCode;

            if (keyCode === 13) {
                if ($scope.msg_text == '') {
                    alert("Please Write Message.");
                    return false;
                }

                var message = {
                    message: $scope.msg_text,
                    owner : $scope.me.id
                };
//                $scope.msgs.push(message);
//                console.log('send_msg', message);
                
                service.postMessages({Message:message}).then(function (response) {
                    var res = response.data;
                    if (res.error) {
                        console.log(res.error);
                        return false;
                    }
                    
//                   console.log('create message: ', res);
//                    $scope.messages = res
                });


                $scope.msg_text = '';
//                    socket.emit('send_msg', data_server);
            }

        };

    };
    controller.$inject = ['$scope', 'service', 'helper'];
    app.controller('timelineCtrl', controller);
}());

// login controller
(function () {
    var controller = function ($scope, $rootScope, service, helper) {

        $scope.user = {
            username: '',
            password: ''
        }

        $scope.doLogin = function () {

            service.login({"User": $scope.user}).then(function (response) {
                var res = response.data;
                if (res.error) {
                    helper.setMessage(res.msg);
                    return false;
                }
                service.setUser(res.data);

                if (res.token)
                    service.setToken(res.token);

                $rootScope.$broadcast('userLogged', res);
//                console.log('doLogin', service.getUser());

            })

        }

        $scope.$on('userLogged', function (event, data) {
            $scope.me = data;
        });

        $scope.$on('userLoggedOut', function (event, data) {
            $scope.me = null;
        });

    };
    controller.$inject = ['$scope', '$rootScope', 'service', 'helper'];
    app.controller('loginCtrl', controller);
}());

// user service
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
            getMessages: function () {
                return $http.get(helper.getSetting('api') + 'message/');
            },
            postMessages: function (message) {
                return $http.post(helper.getSetting('api') + 'message/create', message);
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
    app.factory('service', factory);
}());

// helper service
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
    app.factory('helper', factory);
}());

(function () {
    var message = function(){
    return{
        scope:{
            message: '=data' 
        },
        template: '<div> {{ message.message }} <comments data="message.comments"> <comments> </div>',
        link:function(scope,element,attributes){

            }
        }
    }
    
   app.directive('message', message); 
}());

(function () {
    var comments = function(){
    return{
        scope:{
            comments: '= data' 
        },
        template: '<ul><li class="" ng-repeat="comment in comments">{{ comment.comment }}</li></ul>',
        link:function(scope,element,attributes){

            }
        }
    }
    
   app.directive('comments', comments); 
}());

