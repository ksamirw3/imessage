'use strict';
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
