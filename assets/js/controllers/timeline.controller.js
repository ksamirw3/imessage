'use strict';
(function () {
    var controller = function ($scope, timelineService, helper) {

        $scope.me = null;
        $scope.selected_user = null;
        $scope.users_list = null;
        $scope.messages = [];

        $scope.msgs = [];


        $scope.$on('userLogged', function (event, data) {
            console.log('userLogged', data);
            
            timelineService.getMessages().then(function (response) {
                var res = response.data;
                if (res.error) {
                    console.log(res.error);
                    return false;
                }
                $scope.messages = res
                console.log('$scope.messages>> ', $scope.messages)
            });

            $scope.me = data;
            
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
                    helper.setMessage("Please Write Message.");
                    return false;
                }

                var message = {
                    message: $scope.msg_text,
                    owner : $scope.me.id
                };
                
                timelineService.postMessages({Message:message}).then(function (response) {
                    var res = response.data;
                    
                    // show notification 
                },
                
                function(err) {
                    console.log('err', err);
                    
                    var err = (err.data) ? err.data : err;
                    
                    if(err.msg)
                        helper.setMessage(err.msg);
                });


                $scope.msg_text = '';
            }

        };

    };
    controller.$inject = ['$scope', 'timelineService', 'helper'];
    angular.module('mgr').controller('timelineCtrl', controller);
}());