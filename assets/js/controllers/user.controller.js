'use strict';
(function () {
    var controller = function ($scope, $rootScope, userService, helper) {

        $scope.user = {
            username: '',
            password: '',
            email: ''
        }

        $scope.doLogin = function () {

            userService.login({"User": $scope.user}).then(function (response) {
                var res = response.data;
                
                userService.setUser(res.data);

                if (res.token)
                    userService.setToken(res.token);

                // let other components know user is logged in
                $rootScope.$broadcast('userLogged', res);
            },
                
            function(err) {
                console.log('err', err);

                var err = (err.data) ? err.data : err;

                if(err.msg)
                    helper.setMessage(err.msg);
            })

        }
        
        $scope.doRegister = function () {

            userService.register({"User": $scope.user}).then(
                function (response) {
                    if(response.status == 200)
                        helper.setMessage('successfull saved');
                    
                    $scope.user = {
                        username: '',
                        password: '',
                        email: ''
                    }
                },
                
                function(err) {
                    console.log('err', err);
                    
                    var err = (err.data) ? err.data : err;
                    
                    if(err.msg)
                        helper.setMessage(err.msg);
                })

        }

        $scope.$on('userLogged', function (event, data) {
            $scope.me = data;
        });

        $scope.$on('userLoggedOut', function (event, data) {
            $scope.me = null;
        });

    };
    controller.$inject = ['$scope', '$rootScope', 'userService', 'helper'];
    angular.module('mgr').controller('userCtrl', controller);
}());